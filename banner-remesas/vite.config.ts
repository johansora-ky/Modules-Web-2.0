import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../components-exports/banner-remesas", // genera el build en una carpeta paralela
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
