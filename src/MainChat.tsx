import React from "react";
import { useZentisFlow } from "./hooks/useZentisFlow";
import ChatThread from "./components/ChatThread";
import LoginForm from "./components/LoginForm";
import HomeSelector from "./components/HomeSelector";
import ClinicalForm from "./components/ClinicalForm";
import DifferentialForm from "./components/DifferentialForm";
import DrugsMenu from "./components/DrugsMenu";
import DrugsPanel from "./components/DrugsPanel";

interface MainChatProps {
  apiKey: string;
  doctor: any;
  chatType: "clinical" | "differential" | "drugs";
  close: () => void;
  endpoint: string;
}

const MainChat: React.FC<MainChatProps> = ({
  apiKey,
  doctor,
  chatType,
  close,
  endpoint,
}) => {
  // 1. El hook se usa acá, recibe los props desde el Popup
  const flow = useZentisFlow({
    apiKey,
    doctor,
    chatType,
    endpoint,
  });

  // 2. Según el flujo, renderiza el paso correspondiente
  if (flow.step === "login") return <LoginForm onSuccess={flow.login} />;
  if (flow.step === "home")
    return <HomeSelector user={flow.user} onSelect={flow.selectMode} />;
  if (flow.step === "clinical")
    return <ClinicalForm onBack={flow.goHome} onSend={flow.handleSend} />;
  if (flow.step === "differential")
    return <DifferentialForm onBack={flow.goHome} onSend={flow.handleSend} />;
  if (flow.step === "drugs")
    return (
      <DrugsMenu
        onSelectPanel={(panel) => {
          flow.setDrugPanel(panel);
          flow.setStep("drugs-panel");
        }}
        onBack={flow.goHome}
      />
    );
  if (flow.step === "drugs-panel" && flow.drugPanel)
    return (
      <DrugsPanel
        panel={flow.drugPanel}
        onBack={() => flow.setStep("drugs")}
        onSend={flow.handleSend}
      />
    );
  if (flow.step === "chat")
    return (
      <ChatThread
        chat={flow.chat}
        onSend={flow.handleSend}
        onBack={flow.goHome}
        mode={flow.mode}
      />
    );

  return null;
};

export default MainChat;
