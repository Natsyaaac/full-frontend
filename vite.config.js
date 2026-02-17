import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
<<<<<<< HEAD
    port: 3000,
    proxy: {
      '/api' : 'http://localhost:5000'
    }
=======
    port: 3000
>>>>>>> 2a73112224d2e2834fa0a77ef45eae1cc312342d
  }
})
