import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

document.addEventListener("DOMContentLoaded", () => {
  const roots = document.querySelectorAll(
    "[data-react-root-grid-cards-effect-appear]"
  );

  console.log(roots);

  roots.forEach((rootElement) => {
    const dataAttr = rootElement.getAttribute("data-module");
    if (!dataAttr) return;

    try {
      const moduleData = JSON.parse(dataAttr);

      createRoot(rootElement).render(
        <StrictMode>
          <App data={moduleData} />
        </StrictMode>
      );

      console.log("✅ React montado sobre", rootElement);
    } catch (e) {
      console.error("❌ Error al parsear data-module", e);
    }
  });
});

// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App.tsx";
// import "./index.css";

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <App data={[]} />
//   </StrictMode>
// );
