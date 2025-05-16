import React, { useState } from "react";
import styles from "./styles/Popup.module.css";
import MainChat from "./MainChat";

interface Props {
  apiKey: string;
  doctor: { name: string; specialty?: string; [key: string]: any };
  chatType: "clinical" | "differential" | "drugs";
  endpoint: string;
  theme?: "light" | "dark";
  buttonPosition?: "bottom-right" | "bottom-left";
  buttonLabel?: string;
}

const ZentisChatWidget: React.FC<Props> = (props) => {
  const {
    apiKey,
    doctor,
    endpoint,
    chatType,
    theme = "light",
    buttonPosition = "bottom-right",
    buttonLabel = "¿Necesitás ayuda?",
  } = props;

  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={`${styles.fab} ${styles[buttonPosition]} ${styles[theme]}`}
        onClick={() => setOpen((v) => !v)}
        aria-label="Abrir chat"
        title={buttonLabel}
      >
        💬
      </div>
      {open && (
        <div className={styles.popupOverlay} onClick={() => setOpen(false)}>
          <div
            className={styles.popup}
            onClick={(e) => e.stopPropagation()}
            data-theme={theme}
          >
            <MainChat
              apiKey={apiKey}
              doctor={doctor}
              chatType={chatType}
              endpoint={endpoint}
              close={() => setOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ZentisChatWidget;
