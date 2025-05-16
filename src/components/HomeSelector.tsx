import React, { useState } from "react";
import styles from "../styles/HomeSelector.module.css";

type Mode = "clinical" | "differential" | "drugs";

interface Props {
  user: { name: string; email: string } | null;
  onSelect: (mode: Mode) => void;
}

const HomeSelector: React.FC<Props> = ({ user, onSelect }) => {
  const [active, setActive] = useState<Mode>("clinical");

  return (
    <div className={styles.wrapper}>
      <div className={styles.center}>
        <div className={styles.greeting}>
          <span className={styles.hello}>Hola {user?.name || "Usuario"},</span>
          <br />
          <span className={styles.question}>¿En qué puedo asistirte hoy?</span>
        </div>

        <div className={styles.chipBar}>
          <button
            className={`${styles.chip} ${
              active === "clinical" ? styles.active : ""
            }`}
            onClick={() => {
              setActive("clinical");
              onSelect("clinical");
            }}
          >
            <span className={styles.chipIcon}>🩺</span>
            Consulta clínica
          </button>
          <button
            className={`${styles.chip} ${
              active === "differential" ? styles.active : ""
            }`}
            onClick={() => {
              setActive("differential");
              onSelect("differential");
            }}
          >
            <span className={styles.chipIcon}>📈</span>
            Diagnóstico diferencial
          </button>
          <button
            className={`${styles.chip} ${
              active === "drugs" ? styles.active : ""
            }`}
            onClick={() => {
              setActive("drugs");
              onSelect("drugs");
            }}
          >
            <span className={styles.chipIcon}>💊</span>
            Medicamentos
            <span className={styles.newBadge}>Nuevo</span>
          </button>
        </div>

        <div className={styles.inputBlock}>
          <input
            className={styles.input}
            placeholder={
              active === "clinical"
                ? "Ingrese su consulta clínica..."
                : active === "differential"
                ? "Describa el cuadro clínico detallado del paciente..."
                : "Ingrese medicamento o búsqueda..."
            }
            disabled
          />
          <button className={styles.sendBtn} disabled>
            <span className={styles.sendIcon}>▶️</span>
          </button>
        </div>
        <div className={styles.helperText}>
          {active === "clinical" &&
            "Resuelve consultas médicas puntuales utilizando modelos entrenados en literatura científica."}
          {active === "differential" &&
            "Evalúa síntomas y sugiere posibles patologías según criterios clínicos."}
          {active === "drugs" &&
            "Consulta interacciones, efectos y recomendaciones de medicamentos."}
        </div>
      </div>
      <div className={styles.footer}>
        Zentis no reemplaza el juicio clínico médico y puede cometer errores. No
        debe usarse como única fuente para decisiones clínicas.
        <br />
        <span className={styles.mini}>
          Desarrollado por <a href="#">Arche Salud ©</a>
        </span>
      </div>
    </div>
  );
};

export default HomeSelector;
