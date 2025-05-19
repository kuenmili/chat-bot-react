import { useState } from "react";

type FlowStep =
  | "login"
  | "home"
  | "clinical"
  | "differential"
  | "drugs"
  | "drugs-panel"
  | "chat";
type Mode = "clinical" | "differential" | "drugs";

export interface ChatMessage {
  role: "user" | "ai";
  text: string;
  timestamp?: number;
}

interface UseZentisFlowParams {
  apiKey: string;
  doctor: any;
  endpoint: string;
  chatType: Mode;
}

export const useZentisFlow = ({
  apiKey,
  doctor,
  endpoint,
  chatType,
}: UseZentisFlowParams) => {
  const [step, setStep] = useState<FlowStep>("login");
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
  const [mode, setMode] = useState<Mode | null>(chatType);
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [drugPanel, setDrugPanel] = useState<string | null>(null);
  // ENVÍA al backend real y actualiza chat
  const ENDPOINTS = {
    clinical: `${endpoint}/clinical`,
    differential: `${endpoint}/differential`,
    drugs: `${endpoint}/drugs`,
  };
  const sendMessage = async (msg: string) => {
    const realMode = mode ?? chatType;

    setChat((chat) => [
      ...chat,
      { role: "user", text: msg, timestamp: Date.now() },
    ]);
    try {
      const headers = new Headers();
      headers.append("Accept", "application/json, text/plain, */*");
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", apiKey);

      const res = await fetch(ENDPOINTS[realMode], {
        method: "POST",
        headers,
        body: JSON.stringify({ reason: msg }),
      });
      const json = await res.json();
      setChat((chat) => [
        ...chat,
        {
          role: "ai",
          text: json.output ?? "Sin respuesta.",
          timestamp: Date.now(),
        },
      ]);
    } catch (err) {
      setChat((chat) => [
        ...chat,
        {
          role: "ai",
          text: "Error al consultar el servidor.",
          timestamp: Date.now(),
        },
      ]);
    }
  };

  function login(user: { name: string; email: string }) {
    setUser(user);
    setStep("home");
  }

  function selectMode(m: Mode) {
    setMode(m);
    if (m === "clinical") setStep("clinical");
    else if (m === "differential") setStep("differential");
    else if (m === "drugs") setStep("drugs");
  }

  function handleSend(text: string) {
    sendMessage(text);
    setStep("chat");
  }

  function goHome() {
    setStep("home");
    setMode(chatType);
    setChat([]);
    setDrugPanel(null);
  }

  return {
    step,
    setStep,
    user,
    login,
    mode,
    selectMode,
    chat,
    handleSend,
    goHome,
    drugPanel,
    setDrugPanel,
  };
};
