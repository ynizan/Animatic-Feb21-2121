import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  // Ensure large audio/media assets are served from public/ without inlining
  assetsInclude: ["**/*.mp3"],
});
