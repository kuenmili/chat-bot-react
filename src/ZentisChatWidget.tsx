import React, { useEffect, useState } from "react";
import styles from "./styles/Popup.module.css";
import MainChat from "./MainChat";

export interface ZentisProps {
  endpoint?: string;
  apiKey?: string;
  doctor?: any; // ahora recibe directamente un objeto
  metadata?: any; // metadata adicional como objeto
}

const ZentisChatWidget: React.FC<ZentisProps> = (props) => {
  const { endpoint, apiKey, doctor, metadata } = props;

  const [currentEndpoint, setCurrentEndpoint] = useState<string | undefined>(
    endpoint
  );
  const [currentApiKey, setCurrentApiKey] = useState<string | undefined>(
    apiKey
  );
  const [currentDoctor, setCurrentDoctor] = useState<any | undefined>(doctor);
  const [currentMetadata, setCurrentMetadata] = useState<any | undefined>(
    metadata
  );

  const [open, setOpen] = useState(true);

  useEffect(() => {
    setCurrentDoctor(doctor);
    console.log("[ZentisChatWidget] doctor actualizado a:", doctor);
    const ev = new CustomEvent("doctor-changed", { detail: doctor });
    window.dispatchEvent(ev);
  }, [doctor]);

  useEffect(() => {
    setCurrentApiKey(apiKey);
    setCurrentEndpoint(endpoint);
    console.log("[ZentisChatWidget] initializeChat con:", apiKey, endpoint);
  }, [apiKey, endpoint]);

  useEffect(() => {
    setCurrentMetadata(metadata);
    console.log("[ZentisChatWidget] metadata actualizada a:", metadata);
    const ev = new CustomEvent("metadata-changed", { detail: metadata });
    window.dispatchEvent(ev);
  }, [metadata]);

  return (
    <>
      {(currentApiKey || currentEndpoint) && (
        <>
          <div
            className={styles.fab}
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir chat"
            title="Abrir chat"
          >
            💬
          </div>
          {open && (
            <div className={styles.popupOverlay} onClick={() => setOpen(false)}>
              <div
                className={styles.popup}
                onClick={(e) => e.stopPropagation()}
              >
                <MainChat
                  apiKey={currentApiKey}
                  endpoint={currentEndpoint}
                  doctor={currentDoctor}
                  close={() => setOpen(false)}
                />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ZentisChatWidget;
