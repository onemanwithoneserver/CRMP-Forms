import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/CRMP-Forms/', // Ensure this matches your repo name
  plugins: [react()],
  server: {
    port: 3000
  }
})
