/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import progress from "vite-plugin-progress";
import { join } from "path";

export default defineConfig({
  plugins: [progress(), react()],
  test: {
    globals: true,
    environment: "jsdom",
  },
  resolve: {
    alias: {
      "@": join(__dirname, "src"),
    },
  },
  base: "./",
  server: {
    host: "0.0.0.0",
    open: process.env.VITEST === "true" ? false : "/",
  },
});
