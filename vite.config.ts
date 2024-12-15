import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Thư mục build
  },
  server: {
    port: 4000,
  },
  base: "/", // Đường dẫn gốc
});
