import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import App from "./App.tsx";
import type { CardInfo } from "./lib/types";

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );

document.addEventListener("DOMContentLoaded", () => {
  const roots = document.querySelectorAll(
    "[data-react-root-page-promociones]"
  );


  roots.forEach((rootElement) => {
    const dataAttr = rootElement.getAttribute("data-module");
    if (!dataAttr) return;

    try {
      const moduleData = JSON.parse(dataAttr);

      // Handle both array format and single object format
      let cards: CardInfo[] = [];
      if (Array.isArray(moduleData.card_info)) {
        cards = moduleData.card_info;
      } else if (moduleData.card_info) {
        cards = [moduleData.card_info];
      } else if (moduleData.text_field) {
        // If it's a single card object directly
        cards = [moduleData];
      }

      createRoot(rootElement).render(
        <StrictMode>
          <App cards={cards} />
        </StrictMode>
      );

      console.log("✅ React montado sobre", rootElement);
    } catch (e) {
      console.error("❌ Error al parsear data-module", e);
    }
  });
});
