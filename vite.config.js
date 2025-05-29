import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    open: false,
    hmr: {
      // Disable WebSocket as it can cause issues in some environments
      protocol: 'http',
      port: 5173
    }
  },
  preview: {
    port: 4173,
    host: true
  },
  // Completely disable esbuild optimization to avoid deadlocks
  optimizeDeps: {
    disabled: true
  },
  build: {
    // Use minimal build settings to avoid esbuild issues
    minify: false,
    sourcemap: false,
    // Increase build timeout
    chunkSizeWarningLimit: 1000
  },
  // Disable CSS code splitting which can cause issues
  css: {
    devSourcemap: false
  }
})
