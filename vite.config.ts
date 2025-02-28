
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { componentTagger } from 'lovable-tagger'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
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
    allowedHosts: true
  },
  preview: {
    port: 8080,
    host: '0.0.0.0',
    cors: true,
    allowedHosts: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    chunkSizeWarningLimit: 1600
  }
}))
