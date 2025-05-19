// src/zentis-webcomponent.tsx

import React from "react";
import * as ReactDOM from "react-dom";
import ZentisChatWidget, { ZentisProps } from "./ZentisChatWidget";

const toCamel = (s: string) =>
  s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

class ZentisWebComponent extends HTMLElement {
  static get observedAttributes() {
    return ["endpoint", "api-key", "doctor", "chat-type"];
  }

  // aquí indicamos que props acumulará de forma parcial las Props
  private props: Partial<ZentisProps> = {};

  constructor() {
    super();
    const attrs = (this.constructor as typeof ZentisWebComponent)
      .observedAttributes;
    attrs.forEach((attr) => {
      const val = this.getAttribute(attr);
      if (val != null) {
        const key = toCamel(attr) as keyof ZentisProps;
        try {
          this.props[key] = JSON.parse(val);
        } catch {
          this.props[key] = val as any;
        }
      }
    });
  }

  attributeChangedCallback(name: string, _old: string, value: string) {
    const key = toCamel(name) as keyof ZentisProps;
    try {
      this.props[key] = JSON.parse(value);
    } catch {
      this.props[key] = value as any;
    }
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    const R = ReactDOM as any;
    R.unmountComponentAtNode(this);
  }

  render() {
    const R = ReactDOM as any;

    // —— Aquí el cast a `any`, o a `ZentisProps` si prefieres:
    R.render(<ZentisChatWidget {...(this.props as ZentisProps)} />, this);
  }
}

customElements.define("zentis-chat-widget", ZentisWebComponent);
