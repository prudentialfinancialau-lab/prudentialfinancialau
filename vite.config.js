import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import adminApiPlugin from './server/vite-plugin-admin.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), adminApiPlugin()],
  server: {
    port: 5067,
    host: '0.0.0.0',
  },
  publicDir: 'public',
})
