import { defineConfig } from 'vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  plugins: [
    ViteEjsPlugin(),
  ],
  server: {
    open: false,
    port: 5173,
    strictPort: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        devtools: resolve(__dirname, 'devtools.html'),
      },
    },
  },
});
