import React, { useState } from "react";
import styles from "../styles/DifferentialForm.module.css";

interface Props {
  onBack: () => void;
  onSend: (text: string) => void;
}

const DifferentialForm: React.FC<Props> = ({ onBack, onSend }) => {
  const [query, setQuery] = useState("");

  return (
    <div className={styles.wrapper}>
      <div className={styles.topBar}>
        <button className={styles.chip} onClick={onBack}>
          {"<"}
        </button>
        <button className={`${styles.chip} ${styles.active}`}>
          Diagnóstico diferencial
        </button>
      </div>
      <div className={styles.center}>
        <div className={styles.title}>Diagnóstico diferencial</div>
        <input
          className={styles.input}
          placeholder="Describa el cuadro clínico detallado del paciente, incluyendo síntomas, antecedentes, signos vitales y estudios realizados."
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
          Evalúa síntomas y sugiere posibles patologías según criterios
          clínicos.
        </div>
      </div>
    </div>
  );
};

export default DifferentialForm;
