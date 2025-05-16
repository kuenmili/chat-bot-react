import React, { useState } from "react";
import styles from "../styles/ClinicalForm.module.css";

interface Props {
  onBack: () => void;
  onSend: (text: string) => void;
}

const ClinicalForm: React.FC<Props> = ({ onBack, onSend }) => {
  const [query, setQuery] = useState("");

  return (
    <div className={styles.wrapper}>
      <div className={styles.topBar}>
        <button className={styles.chip} onClick={onBack}>
          {"<"}
        </button>
        <button className={`${styles.chip} ${styles.active}`}>
          Consulta clínica
        </button>
      </div>
      <div className={styles.center}>
        <div className={styles.title}>Consulta clínica</div>
        <input
          className={styles.input}
          placeholder="Ingrese su consulta clínica..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          maxLength={512}
        />
        <button
          className={styles.sendBtn}
          disabled={!query.trim()}
          onClick={() => query.trim() && onSend(query.trim())}
        >
          <span className={styles.sendIcon}>▶️</span>
        </button>
        <div className={styles.helperText}>
          Resuelve consultas médicas puntuales utilizando modelos entrenados en
          literatura científica.
        </div>
      </div>
    </div>
  );
};

export default ClinicalForm;
