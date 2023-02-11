//importación de librerias de react 
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//importación de los estilos de react
import "./styles.css";

import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);