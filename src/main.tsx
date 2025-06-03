// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";

// 1) Importa AQUÍ tu Web Component antes de montar <App />
import "./zentis-webcomponent";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
