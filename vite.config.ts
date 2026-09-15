import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  // "/" locally and on a custom domain; "/flowa-website/" on GitHub Pages (set by the deploy workflow).
  base: process.env.VITE_BASE || "/",
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  server: { port: 5174, open: true },
});
