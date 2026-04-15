import { defineConfig } from 'vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';

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
});
