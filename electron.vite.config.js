import { defineConfig, bytecodePlugin } from "electron-vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  publicDir: false,
  main: {
    build: { minify: "esbuild" },
    plugins: [
      bytecodePlugin({
        protectedStrings: [],
      }),
    ],
  },
  preload: {
    build: { minify: "esbuild" },
  },
  renderer: {
    publicDir: resolve(__dirname, "src", "public"),
    build: {
      minify: "esbuild",
      rollupOptions: {
        output: {
          manualChunks: [],
        },
      },
    },
    server: { hmr: { overlay: false } },
    esbuild: {
      loader: "jsx",
      include: /src\/.*\.jsx?$/,
      exclude: [],
    },
    optimizeDeps: {
      esbuildOptions: {
        loader: { ".js": "jsx" },
      },
    },
    plugins: [react()],
  },
});
