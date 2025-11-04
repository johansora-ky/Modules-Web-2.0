import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

document.addEventListener("DOMContentLoaded", () => {
  const roots = document.querySelectorAll("[data-react-root-maps-react-v1]");

  roots.forEach((rootElement) => {
    const dataAttr = rootElement.getAttribute("data-module");
    if (!dataAttr) return;

    try {
      // const moduleData = JSON.parse(dataAttr);

      createRoot(rootElement).render(
        <StrictMode>
          <App />
        </StrictMode>
      );

      console.log("✅ React montado sobre", rootElement);
    } catch (e) {
      console.error("❌ Error al parsear data-module", e);
    }
  });
});

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );
