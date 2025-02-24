
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0", // Allow connections from all hosts
    port: Number(process.env.PORT) || 8080, // Use PORT env variable or default to 8080
    strictPort: true, // Fail if port is already in use
    allowedHosts: ["697be092-4603-4d66-a348-5098640004d6.lovableproject.com"]
  },
  preview: {
    host: "0.0.0.0",
    port: Number(process.env.PORT) || 8080,
    strictPort: true,
    allowedHosts: ["697be092-4603-4d66-a348-5098640004d6.lovableproject.com"]
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
