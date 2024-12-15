import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "frontend_redux/dist", // Đảm bảo đường dẫn đúng
  },
  server: {
    port: 4000,
  },
  base: "/",
});
