import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: "0.0.0.0",
    open: true,
    hmr: {
      host: "0.0.0.0",
    },
    proxy: {
      '/websocket': {
        target: 'ws://localhost:8765',
        ws: true
      }
    }
  },
});
