import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://alpha-6dxp.onrender.com/',
        changeOrigin: true
      }
    }
  }
})