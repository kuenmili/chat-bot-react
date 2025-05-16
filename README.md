# Zentis Chat Widget

Widget de chat médico IA (flujo tipo TalkJS) listo para instalar en cualquier app React.

## Instalación

1. Clona o descarga el paquete y ponlo en tu monorepo/proyecto:
o simplemente copia los archivos a `/src` si trabajas en un único proyecto.

2. Asegúrate de tener React y ReactDOM como dependencias.

## Uso

En tu app principal:

```tsx
import ZentisChatWidget from "zentis-chat-widget";
// O si lo copiaste directo: import ZentisChatWidget from "./ZentisChatWidget";

function App() {
return (
 <div>
   <h1>Demo App</h1>
   <ZentisChatWidget />
 </div>
);
}

export default App;
