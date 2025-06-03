// src/App.tsx

import React, { useRef } from "react";

const App: React.FC = () => {
  // El tipo HTMLZentisChatWidgetElement viene de global.d.ts
  const chatRef = useRef<HTMLZentisChatWidgetElement>(null);

  const API_KEY = "TU_API_KEY_REAL_AQUÍ";
  const ENDPOINT = "http://localhost:3000";

  const handleInitChat = () => {
    if (chatRef.current) {
      console.log("Constructor:", chatRef.current.constructor.name);
      console.log("¿Tiene init? →", typeof chatRef.current.init);
      chatRef.current.init(API_KEY, ENDPOINT);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <button onClick={handleInitChat}>Iniciar Chat Zentis</button>
      <zentis-chat-widget ref={chatRef} />
      <div>hola</div>
    </div>
  );
};

export default App;
