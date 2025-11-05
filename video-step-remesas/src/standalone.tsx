import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById("root");
  if (!rootEl) return;
  createRoot(rootEl).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
