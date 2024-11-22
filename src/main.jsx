import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Asegúrate de que `App.jsx` esté en la raíz de `src`
import "./index.css"; // Asegúrate de que los estilos estén correctamente configurados

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
