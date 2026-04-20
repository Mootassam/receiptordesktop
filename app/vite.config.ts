import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  base: './',
  plugins: [react()],

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8085',
        changeOrigin: true,
        secure: false,
      },

      '/coingecko': {
        target: 'https://api.coingecko.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/coingecko/, ''),
      },
    },
  },
})
