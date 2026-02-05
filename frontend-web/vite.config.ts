import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // This tells Vite: "The package is exactly in the node_modules next to this config file"
      "next-themes": path.resolve(__dirname, "node_modules/next-themes"),
    },
  },
  build: {
    rollupOptions: {
      // Prevents Rollup from trying to find 'next-themes' outside the bundle
      external: [], 
    },
  },
});