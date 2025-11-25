import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("banner-kredicash-root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// document.addEventListener("DOMContentLoaded", () => {
//   const roots = document.querySelectorAll(
//     "[data-react-root-[name-of-the-module]]"
//   );

//   console.log(roots);

//   roots.forEach((rootElement) => {
//     const dataAttr = rootElement.getAttribute("data-module");
//     if (!dataAttr) return;

//     try {
//       // const moduleData = JSON.parse(dataAttr);

//       createRoot(rootElement).render(
//         <StrictMode>
//           <App />
//         </StrictMode>
//       );

//       console.log("✅ React montado sobre", rootElement);
//     } catch (e) {
//       console.error("❌ Error al parsear data-module", e);
//     }
//   });
// });
