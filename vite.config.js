import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { resolve } from 'path';

const apiUrl = process.env.API_URL || 'http://localhost:8600';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  server: {
    proxy: {
      '/api': {
        target: apiUrl,
        changeOrigin: true,
        rewrite: (apiPath) => apiPath.replace(/^\/api/, ''),
      },
    },
  },
  test: {
    css: false,
    include: ['src/**/*.test.ts'],
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests.ts',
    clearMocks: true,
  },
  define: {
    'process.env': process.env,
    'process.cwd': process.cwd,
  },
});
