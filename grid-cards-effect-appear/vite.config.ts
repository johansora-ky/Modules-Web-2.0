import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "../components-exports/grid-cards-effect-appear", // genera el build en una carpeta paralela
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "module.js",
        assetFileNames: "module.[ext]",
      },
    },
  },
});
