import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  build: {
    rollupOptions: {
      // Assurez-vous que l'entrée est le fichier HTML
      input: {
        main: fileURLToPath(new URL('/index.html', import.meta.url)),
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('/src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/broadcasting': {
        target: 'http://localhost:8000', // port de ton serveur Laravel
        changeOrigin: true,
        secure: false,
      },
    },
  },  
})
