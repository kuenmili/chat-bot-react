import React from "react";
import ReactDOM from "react-dom";
import reactToWebComponent from "react-to-webcomponent";
import ZentisChatWidget from "./src/ZentisChatWidget";

// Convierte el componente React en un Web Component
const WebZentisWidget = reactToWebComponent(ZentisChatWidget, React, ReactDOM);

// Registra el custom element globalmente
customElements.define("zentis-chat-widget", WebZentisWidget);
