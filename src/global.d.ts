// src/global.d.ts

/// <reference types="react" />

// Declaración de módulos CSS (si los usas) y de “react-to-webcomponent”:
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "react-to-webcomponent";

/**
 * 1) Interfaz global del Web Component <zentis-chat-widget>.
 *    Como no hay import/export, esto es completamente ambient y
 *    vive en el scope global de TypeScript.
 */
interface HTMLZentisChatWidgetElement extends HTMLElement {
  init(apiKey: string, endpoint: string): void;
  setDoctor(doctor: any): void;
  setMetadata(metadata: any): void;
}

/**
 * 2) Ahora ampliamos el namespace JSX.IntrinsicElements para que
 *    <zentis-chat-widget> sea reconocido en cualquier .tsx/.jsx.
 *    Usamos React.DetailedHTMLProps<React.HTMLAttributes<…>> para que
 *    TypeScript sepa que este tag puede llevar cualquier atributo HTML estándar.
 */
declare namespace JSX {
  interface IntrinsicElements {
    "zentis-chat-widget": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLZentisChatWidgetElement>,
      HTMLZentisChatWidgetElement
    >;
  }
}
