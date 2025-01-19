import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import { resolve } from 'path'
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'app.html')
        }
      }
    },
    plugins: [sveltekit()]
  }
});
