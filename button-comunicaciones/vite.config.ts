import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "../components-exports/button-comunicaciones", // genera el build en una carpeta paralela
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "module.js",
        assetFileNames: "module.[ext]",
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
