import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //cors 문제 때문에 설정. cors문제 해결되면 삭제.
  server: {
    proxy: {
      "/api": {
        target: "https://sparta-games.net/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
