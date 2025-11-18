import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../components-exports/banner-threejs-krdya",
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
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
    port: 5173,
    strictPort: true,
  },
})

