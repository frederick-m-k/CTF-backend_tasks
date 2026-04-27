import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/c8_medium",
  build: {
    outDir: "c8_medium",
    assetsDir: "assets",
    rollupOptions: {
      output: {
        
      }
    }
  }
})
