import { createRoot, Root } from "react-dom/client";
import ZentisChatWidget, { ZentisProps } from "./ZentisChatWidget";

class ZentisWebComponent extends HTMLElement {
  private _endpoint: string = "";
  private _apiKey: string = "";
  private _doctor: any = {};
  private _metadata: any = {};

  private reactRoot: Root | null = null;

  constructor() {
    super();
  }

  connectedCallback() {
    if (!this.reactRoot) {
      this.reactRoot = createRoot(this);
    }
  }

  disconnectedCallback() {
    if (this.reactRoot) {
      this.reactRoot.unmount();
      this.reactRoot = null;
    }
  }

  get endpoint(): string {
    return this._endpoint;
  }
  set endpoint(value: string) {
    this._endpoint = value;
    this.renderIfInitialized();
    this.dispatchEvent(new CustomEvent("endpoint-changed", { detail: value }));
  }

  get apiKey(): string {
    return this._apiKey;
  }
  set apiKey(value: string) {
    this._apiKey = value;
    this.renderIfInitialized();
    this.dispatchEvent(new CustomEvent("api-key-changed", { detail: value }));
  }

  get doctor(): any {
    return this._doctor;
  }
  set doctor(value: any) {
    this._doctor = value;
    this.renderIfInitialized();
    this.dispatchEvent(new CustomEvent("doctor-changed", { detail: value }));
  }

  get metadata(): any {
    return this._metadata;
  }
  set metadata(value: any) {
    this._metadata = value;
    this.renderIfInitialized();
    this.dispatchEvent(new CustomEvent("metadata-changed", { detail: value }));
  }

  //
  // === MÉTODOS PÚBLICOS ===
  //

  /**
   * init: método que debe invocarse primero para pasar apiKey y endpoint.
   * Hasta que no se llame, el chat NO se renderiza.
   */
  public init(apiKey: string, endpoint: string) {
    this._apiKey = apiKey;
    this._endpoint = endpoint;
    // Llamamos a un render completo (solo si tenemos root creado)
    this.renderIfInitialized();
    this.dispatchEvent(
      new CustomEvent("chat-initialized", {
        detail: { apiKey: this._apiKey, endpoint: this._endpoint },
      })
    );
  }

  /**
   * setDoctor: cambia el doctor y vuelve a renderizar (si ya hubo init).
   */
  public setDoctor(doctor: any) {
    this._doctor = doctor;
    this.renderIfInitialized();
    this.dispatchEvent(new CustomEvent("doctor-changed", { detail: doctor }));
  }

  /**
   * setMetadata: cambia la metadata y vuelve a renderizar (si ya hubo init).
   */
  public setMetadata(metadata: any) {
    this._metadata = metadata;
    this.renderIfInitialized();
    this.dispatchEvent(
      new CustomEvent("metadata-changed", { detail: metadata })
    );
  }
  //
  // === LÓGICA INTERNA DE RENDERIZADO ===
  //

  /**
   * Este método comprueba si ya se llamó a init (es decir, apiKey y endpoint no están vacíos).
   * Si no se ha llamado, NO hacemos nada (no renderizamos).
   * Si ya se ha llamado, hacemos un render de React pasándole los props actuales.
   */
  private renderIfInitialized() {
    // Verificamos que apiKey y endpoint no sean cadenas vacías (o null/undefined).
    if (!this._apiKey || !this._endpoint) {
      // Si aún no se ha inicializado, no renderizamos nada.
      return;
    }

    // Preparamos el objeto ZentisProps completo
    const props: ZentisProps = {
      endpoint: this._endpoint,
      apiKey: this._apiKey,
      doctor: this._doctor,
      metadata: this._metadata,
    };

    // Renderizamos con React 18
    if (this.reactRoot) {
      this.reactRoot.render(<ZentisChatWidget {...props} />);
    }
  }
}

customElements.define("zentis-chat-widget", ZentisWebComponent);
