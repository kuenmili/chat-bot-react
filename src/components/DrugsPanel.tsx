import React, { useState } from "react";
import styles from "../styles/DrugsPanel.module.css";

interface Props {
  panel: string;
  onBack: () => void;
  onSend: (text: string) => void;
}

const DrugsPanel: React.FC<Props> = ({ panel, onBack, onSend }) => {
  // Sólo demo para "interaccion"
  const [medicamento, setMedicamento] = useState("");
  const [meds, setMeds] = useState<string[]>([]);

  const handleAdd = () => {
    if (medicamento.trim()) {
      setMeds([...meds, medicamento.trim()]);
      setMedicamento("");
    }
  };

  const handleSend = () => {
    if (meds.length > 0) {
      onSend("Medicamentos: " + meds.join(", "));
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.panel}>
        <div className={styles.header}>
          <span className={styles.icon}>🔀</span>
          <span className={styles.title}>Interacción farmacológica</span>
          <button className={styles.closeBtn} onClick={onBack}>
            ×
          </button>
        </div>
        <div className={styles.subtitle}>Consulta</div>
        <div className={styles.desc}>
          Qué interacciones debo considerar entre los siguientes medicamentos:
        </div>
        {meds.length === 0 && (
          <div className={styles.emptyMsg}>
            Agregue al menos un medicamento para continuar
          </div>
        )}
        <ul className={styles.medsList}>
          {meds.map((m, i) => (
            <li key={i} className={styles.medItem}>
              {m}
              <button
                className={styles.removeBtn}
                onClick={() => setMeds(meds.filter((_, idx) => idx !== i))}
                title="Eliminar"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
        <div className={styles.addRow}>
          <input
            className={styles.input}
            placeholder="Ingrese medicamento..."
            value={medicamento}
            onChange={(e) => setMedicamento(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? handleAdd() : undefined)}
          />
          <button
            className={styles.addBtn}
            disabled={!medicamento.trim()}
            onClick={handleAdd}
          >
            + Agregar
          </button>
        </div>
        <button
          className={styles.sendBtn}
          onClick={handleSend}
          disabled={meds.length === 0}
        >
          Enviar consulta
        </button>
      </div>
    </div>
  );
};

export default DrugsPanel;
