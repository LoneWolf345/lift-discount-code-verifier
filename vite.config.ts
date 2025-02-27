
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
    host: '0.0.0.0',
    fs: {
      strict: false,
      allow: ['.']
    },
    hmr: {
      clientPort: 8080
    },
    watch: {
      usePolling: true
    },
    cors: true,
    allowedHosts: [
      '697be092-4603-4d66-a348-5098640004d6.lovableproject.com',
      'lift-discount-code-verifier-discount-code-verifier-uat.apps.uat-ocp4.uat.corp.cableone.net'
    ]
  },
  preview: {
    port: 8080,
    host: '0.0.0.0',
    cors: true,
    allowedHosts: [
      '697be092-4603-4d66-a348-5098640004d6.lovableproject.com',
      'lift-discount-code-verifier-discount-code-verifier-uat.apps.uat-ocp4.uat.corp.cableone.net'
    ]
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    chunkSizeWarningLimit: 1600
  }
})
