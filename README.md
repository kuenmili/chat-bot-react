# Zentis Chat Widget

Componente Web de chat React empaquetado como Web Component (UMD) para integrarse fácilmente en cualquier proyecto (Vanilla JS, .NET, etc.).

## Características

* Empaquetado en formato UMD con estilos inyectados por JS
* No requiere configuración de bundler en el proyecto consumidor
* Exposición de atributos HTML (kebab-case) para configurar props
* Soporta modos de chat: `clinical`, `differential`, `drugs`

## Instalación

### Desde npm / unpkg

Puedes usar el Widget directamente desde unpkg o instalarlo en tu proyecto:

```bash
# Con npm
tnpm i zentis-chat-widget # o npm install
```

```html
<!-- React y ReactDOM (peer dependencies) -->
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<!-- Widget UMD con CSS inyectado -->
    <script src="https://unpkg.com/zentis-chat-widget@1.0.11/dist/zentis-chat-widget.umd.js"></script>
```

### Sirviendo desde tu servidor

Después de compilar (`npm run build`), copia `dist/zentis-chat-widget.umd.js` a tu carpeta pública (por ejemplo `wwwroot/dist/`) y carga:

```html
<script src="/dist/zentis-chat-widget.umd.js"></script>
```

## Uso en HTML

Agrega el custom element donde quieras en tu HTML:

```html
<zentis-chat-widget
  api-key="TU_JWT_TOKEN"
  endpoint="http://localhost:3000/zentis"
  doctor='{"name":"mili","specialty":"cardiología"}'
  chat-type="clinical"
  theme="light"
  button-position="bottom-right"
  button-label="¿Necesitás ayuda?"
></zentis-chat-widget>
```

### Atributos HTML

| Atributo          | Prop (camelCase) | Obligatorio | Descripción                                                   |
| ----------------- | ---------------- | ----------- | ------------------------------------------------------------- |
| `api-key`         | `apiKey`         | Sí          | JWT para autorización en el header `Authorization`.           |
| `endpoint`        | `endpoint`       | Sí          | URL base del backend (sin trailing slash).                    |
| `doctor`          | `doctor`         | Sí          | JSON string con datos del doctor (e.g. `{ "name": "mili" }`). |
| `chat-type`       | `chatType`       | Sí          | Modo de chat: `clinical`, `differential` o `drugs`.           |
| `theme`           | `theme`          | No          | Tema: `light` o `dark`. Por defecto `light`.                  |
| `button-position` | `buttonPosition` | No          | `bottom-right` o `bottom-left`. Por defecto `bottom-right`.   |
| `button-label`    | `buttonLabel`    | No          | Texto del tooltip del botón flotante.                         |

## Ejemplo completo

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Demo Zentis Widget</title>
  <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/zentis-chat-widget@1.0.11/dist/zentis-chat-widget.umd.js"></script>
  <link href="style.css" rel="stylesheet" />
</head>
<body>
  <zentis-chat-widget
    api-key="eyJraWQiOiJYOEhD…"
    endpoint="http://localhost:3000/zentis"
    doctor='{"name":"mili","specialty":"dermatología"}'
    chat-type="clinical"
    theme="light"
    button-position="bottom-right"
    button-label="¿Necesitás ayuda?"
  ></zentis-chat-widget>
</body>
</html>
```

## Integración en .NET Core Razor

En tu `_Layout.cshtml`, carga al final de los scripts:

```html
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/zentis-chat-widget@1.0.12/dist/zentis-chat-widget.umd.js"></script>
```

Y agrega el elemento:

```html
<zentis-chat-widget
  api-key="TU_JWT_TOKEN"
  endpoint="https://tu-backend/zentis"
  doctor='{"name":"Dr. López"}'
  chat-type="clinical"
></zentis-chat-widget>
```

## Customización y Temas

* **Tema oscuro**: `theme="dark"`.
* **Posición del botón**: usa `button-position="bottom-left"`.
* **Etiqueta**: `button-label="Chat con Soporte"`.

## Eventos y API interna

Actualmente el componente no emite eventos personalizados. Se puede extender para exponer eventos de apertura/cierre si se necesita.

## Desarrollo y aportes

* Clona el repositorio:

  ```bash
  ```

git clone [https://github.com/tu-org/zentis-chat-widget.git](https://github.com/tu-org/zentis-chat-widget.git)
cd zentis-chat-widget
npm install
npm run build

```
- Para ejecutar un demo local:
1. Copia `dist/` en una carpeta `demo/` de tu proyecto static.
2. Abre `demo/index.html` en el navegador.


```


# Zentis Chat Widget

Componente Web de chat React empaquetado como Web Component (UMD) y módulo ESM, para integrarse fácilmente en cualquier proyecto (Vanilla JS, React, .NET, etc.).

## Características

* Empaquetado en formato UMD con estilos inyectados por JS mediante `vite-plugin-css-injected-by-js`.
* Exporta módulo ESM para uso nativo en React y bundlers modernos.
* No requiere configuración de bundler en el proyecto consumidor.
* Expone atributos HTML (kebab-case) para configurar props desde Web Component.
* Propiedades React `props` para uso directo en proyectos React.
* Soporta modos de chat: `clinical`, `differential`, `drugs`.

## Instalación

### 1. Usar desde npm

En tu proyecto React (o cualquier proyecto basado en Node):

```bash
# Con npm
o npm install zentis-chat-widget
# Con Yarn
yarn add zentis-chat-widget
```

### 2. Usar desde unpkg (HTML estático)

Si solo necesitas el UMD Web Component, puedes cargarlo desde CDN sin instalación:

```html
<!-- React y ReactDOM (peer dependencies) -->
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<!-- Widget UMD con CSS inyectado -->
<script src="https://unpkg.com/zentis-chat-widget@latest/dist/zentis-chat-widget-webc.umd.js"></script>
```

## Uso en HTML (Vanilla JS o Razor)

Agrega el custom element donde quieras en tu HTML:

```html
<zentis-chat-widget
  api-key="TU_JWT_TOKEN"
  endpoint="http://localhost:3000/zentis"
  doctor='{"name":"mili","specialty":"cardiología"}'
  chat-type="clinical"
  theme="light"
  button-position="bottom-right"
  button-label="¿Necesitás ayuda?"
></zentis-chat-widget>
```

### Atributos HTML disponibles

| Atributo          | Prop (camelCase) | Obligatorio | Descripción                                                   |
| ----------------- | ---------------- | ----------- | ------------------------------------------------------------- |
| `api-key`         | `apiKey`         | Sí          | JWT para autorización en el header `Authorization`.           |
| `endpoint`        | `endpoint`       | Sí          | URL base del backend (sin trailing slash).                    |
| `doctor`          | `doctor`         | Sí          | JSON string con datos del doctor (e.g. `{ "name": "mili" }`). |
| `chat-type`       | `chatType`       | Sí          | Modo de chat: `clinical`, `differential` o `drugs`.           |
| `theme`           | `theme`          | No          | Tema: `light` o `dark`. Por defecto `light`.                  |
| `button-position` | `buttonPosition` | No          | `bottom-right` o `bottom-left`. Por defecto `bottom-right`.   |
| `button-label`    | `buttonLabel`    | No          | Texto del tooltip del botón flotante.                         |

## Uso en React (ESM)

Después de instalar el paquete en tu proyecto React, importa y usa el componente directamente como un componente React:

```tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import ZentisChatWidget from 'zentis-chat-widget';

function App() {
  const token = 'TU_JWT_TOKEN';
  const endpoint = 'https://api.tu-dominio.com/zentis';

  return (
    <div>
      {/* ... otras secciones de tu app ... */}
      <ZentisChatWidget
        apiKey={token}
        endpoint={endpoint}
        doctor={{ name: 'Dr. López', specialty: 'Dermatología' }}
        chatType="clinical"
        theme="dark"
        buttonPosition="bottom-left"
        buttonLabel="Chatea con soporte"
      />
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

### Props del componente React

| Prop             | Tipo                                                       | Obligatorio     | Descripción                                         |                                              |                                                     |
| ---------------- | ---------------------------------------------------------- | --------------- | --------------------------------------------------- | -------------------------------------------- | --------------------------------------------------- |
| `apiKey`         | `string`                                                   | Sí              | JWT para autorización en el header `Authorization`. |                                              |                                                     |
| `endpoint`       | `string`                                                   | Sí              | URL base del backend (sin trailing slash).          |                                              |                                                     |
| `doctor`         | `{ name: string; specialty?: string; [key: string]: any }` | Sí              | Datos del doctor para personalizar la consulta.     |                                              |                                                     |
| `chatType`       | \`'clinical'                                               | 'differential'  | 'drugs'\`                                           | Sí                                           | Modo de chat: `clinical`, `differential` o `drugs`. |
| `theme`          | \`'light'                                                  | 'dark'\`        | No                                                  | Tema visual del widget. Por defecto `light`. |                                                     |
| `buttonPosition` | \`'bottom-right'                                           | 'bottom-left'\` | No                                                  | Posición del botón flotante.                 |                                                     |
| `buttonLabel`    | `string`                                                   | No              | Texto del tooltip del botón flotante.               |                                              |                                                     |

## Ejemplo completo en React

```tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import ZentisChatWidget from 'zentis-chat-widget';

function Main() {
  const token = 'eyJraWQiOiJ...';
  const endpoint = 'https://api.tu-dominio.com/zentis';

  return (
    <ZentisChatWidget
      apiKey={token}
      endpoint={endpoint}
      doctor={{ name: 'Dra. Martínez' }}
      chatType="clinical"
    />
  );
}

createRoot(document.getElementById('root')).render(<Main />);
```

## Desarrollo y aportes

Clona el repositorio y contribuye:

```bash
git clone https://github.com/tu-org/zentis-chat-widget.git
cd zentis-chat-widget
npm install
npm run build
```

Para probar localmente el HTML demo:

1. Copia la carpeta `dist/` en un proyecto estático.
2. Crea un `demo/index.html` similar al ejemplo de uso en HTML.
3. Abre `demo/index.html` en tu navegador.

---


