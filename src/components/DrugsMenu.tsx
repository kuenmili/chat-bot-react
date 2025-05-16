import React from "react";
import styles from "../styles/DrugsMenu.module.css";

interface Props {
  onSelectPanel: (panel: string) => void;
  onBack: () => void;
}

const cards = [
  {
    key: "interaccion",
    title: "Interacción farmacológica",
    desc: "Consulta interacciones entre medicamentos y posibles contraindicaciones",
    icon: "🔀",
  },
  {
    key: "efectos",
    title: "Efectos adversos",
    desc: "Consulta efectos secundarios y reacciones adversas de medicamentos",
    icon: "⚠️",
  },
  {
    key: "patologia",
    title: "Buscar por patología",
    desc: "Consulta medicamentos recomendados para una patología específica",
    icon: "🔎",
  },
];

const DrugsMenu: React.FC<Props> = ({ onSelectPanel, onBack }) => (
  <div className={styles.wrapper}>
    <div className={styles.chipBar}>
      <button className={styles.chip} onClick={onBack}>
        {"<"}
      </button>
      <button className={`${styles.chip} ${styles.active}`}>
        Medicamentos <span className={styles.newBadge}>Nuevo</span>
      </button>
    </div>
    <div className={styles.cardGrid}>
      {cards.map((card) => (
        <div
          key={card.key}
          className={styles.card}
          onClick={() => onSelectPanel(card.key)}
        >
          <span className={styles.icon}>{card.icon}</span>
          <div className={styles.title}>{card.title}</div>
          <div className={styles.desc}>{card.desc}</div>
        </div>
      ))}
    </div>
  </div>
);

export default DrugsMenu;
