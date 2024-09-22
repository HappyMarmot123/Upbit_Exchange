import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react({ include: /\.(mdx|js|jsx|ts|tsx)$/ })],
  root: "src", // 바이트 설정 파일은 index.html이다.
  build: {
    outDir: "../build", // config파일이 아닌 index.html 파일 디렉토리를 기준으로 빌드 디렉토리를 설정한다.
  },
});
