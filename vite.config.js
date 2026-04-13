import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: {
    open: false,
    port: 5173,
    strictPort: true,
  },
});
