import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // 파일 변경 감지 시스템을 강제로 깨워줍니다.
    },
    hmr: {
      overlay: false, // 에러 발생 시 화면이 멈추는 오버레이 현상을 방지합니다.
    },
  },
});
