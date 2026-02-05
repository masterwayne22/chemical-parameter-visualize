import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // This forces Vite to look in the correct node_modules folder
      "next-themes": path.resolve(__dirname, "./node_modules/next-themes"),
    },
  },
  build: {
    // This ensures that Rollup doesn't try to "externalize" the theme manager
    rollupOptions: {
      external: [],
    },
    // Useful for debugging if there are still issues
    sourcemap: true,
  },
  server: {
    port: 8080,
  },
});