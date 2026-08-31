import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Served from https://kubegraf.github.io/agentenx.com/, so every asset URL has
// to carry that prefix. Vite rewrites `/public` references in index.html and CSS
// using this value — set it wrong and the page loads with no CSS and no fonts,
// which looks like a broken build rather than a wrong path.
const BASE = "/agentenx.com/";

export default defineConfig({
  base: BASE,
  plugins: [react()],
  build: {
    target: "es2020",
    cssCodeSplit: false,
    // One page, one bundle. Splitting a single-route site only adds round trips.
    rollupOptions: { output: { manualChunks: undefined } },
  },
});
