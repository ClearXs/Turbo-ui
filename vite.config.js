import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';

// https://cn.vitejs.dev/config/#using-environment-variables-in-config
export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '');
  const apiUrl = env.API_URL;
  return {
    plugins: [
      react({
        tsDecorators: true,
      }),
    ],
    build: {
      outDir: 'dist',
      sourcemap: false,
    },
    esbuild: { target: 'es2022' },
    resolve: {
      alias: [
        { find: /^~/, replacement: '' },
        { find: '@', replacement: resolve(__dirname, 'src') },
      ],
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    },
    server: {
      proxy: {
        '/api': {
          target: apiUrl,
          changeOrigin: true,
          ws: true,
          rewrite: (apiPath) => apiPath.replace(/^\/api/, ''),
        },
      },
    },
    optimizeDeps: {
      include: ['react/jsx-runtime'],
    },
    define: {
      _global: {},
    },
    /**
     * [plugin:vite:css] Inline JavaScript is not enabled. Is it set in your options?
     *
     * Ref:
     *   https://blog.csdn.net/baobao_123456789/article/details/113986961
     *   https://stackoverflow.com/questions/46729091/enable-inline-javascript-in-less
     */
    css: {},
    test: {
      css: false,
      include: ['src/**/*.test.ts'],
      globals: true,
      environment: 'jsdom',
      setupFiles: 'src/setupTests.ts',
      clearMocks: true,
    },
  };
});
