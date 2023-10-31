import { defineConfig, bytecodePlugin } from "electron-vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  publicDir: false,
  main: {
    plugins: [bytecodePlugin()],
  },
  preload: {},
  renderer: {
    plugins: [react()],
  },
});
