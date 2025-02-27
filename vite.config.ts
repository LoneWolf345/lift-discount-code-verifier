
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
    host: '0.0.0.0'  // This allows access from outside the container
  },
  preview: {
    port: 8080,
    host: '0.0.0.0'  // This allows access from outside the container
  }
})
