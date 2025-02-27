
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    port: 8080,
    host: '0.0.0.0',  // This allows access from outside the container
    allowedHosts: ['697be092-4603-4d66-a348-5098640004d6.lovableproject.com']
  },
  preview: {
    port: 8080,
    host: '0.0.0.0',  // This allows access from outside the container
    allowedHosts: ['697be092-4603-4d66-a348-5098640004d6.lovableproject.com']
  }
})
