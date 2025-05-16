import React from "react";
import styles from "../styles/ChatThread.module.css";
import { ChatMessage } from "../hooks/useZentisFlow";

interface Props {
  chat: ChatMessage[];
  onSend: (text: string) => void;
  onBack: () => void;
  mode: "clinical" | "differential" | "drugs" | null;
}

const ChatThread: React.FC<Props> = ({ chat, onSend, onBack, mode }) => {
  const [input, setInput] = React.useState("");

  const handleSend = () => {
    if (input.trim()) {
      onSend(input.trim());
      setInput("");
    }
  };

  return (
    <div className={styles.chatWrapper}>
      <div className={styles.topBar}>
        <button className={styles.chip} onClick={onBack}>
          {"<"}
        </button>
        <span className={styles.chip}>
          {mode === "clinical"
            ? "Consulta clínica"
            : mode === "differential"
            ? "Diagnóstico diferencial"
            : "Medicamentos"}
        </span>
      </div>
      <div className={styles.messages}>
        {chat.map((msg, idx) => (
          <div
            key={idx}
            className={msg.role === "user" ? styles.userMsg : styles.aiMsg}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className={styles.inputRow}>
        <input
          className={styles.input}
          placeholder={
            mode === "clinical"
              ? "Ingrese su consulta clínica..."
              : mode === "differential"
              ? "Describa el cuadro clínico detallado del paciente..."
              : "Ingrese medicamento o consulta..."
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? handleSend() : undefined)}
        />
        <button
          className={styles.sendBtn}
          onClick={handleSend}
          disabled={!input.trim()}
        >
          ▶️
        </button>
      </div>
    </div>
  );
};

export default ChatThread;
