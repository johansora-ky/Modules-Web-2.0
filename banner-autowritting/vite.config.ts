import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "../components-exports/banner-autowritting", // genera el build en una carpeta paralela
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
    // Allow Cloudflare quick tunnel host header
    allowedHosts: [
      'universities-phrase-explorer-populations.trycloudflare.com',
      '.trycloudflare.com',
    ],
    // Improve HMR over tunnel (update host if Cloudflare subdomain changes)
    hmr: {
      protocol: 'wss',
      host: 'universities-phrase-explorer-populations.trycloudflare.com',
      port: 443,
    },
  },
})
