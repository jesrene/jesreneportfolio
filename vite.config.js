import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: '/jesreneportfolio/',
  plugins: [react()],
  build: { outDir: 'docs' }
})
