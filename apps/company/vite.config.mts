import { defineConfig } from '@manhtri/vite-config';
import ElementPlus from 'unplugin-element-plus/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig(async () =>  {
  return {
    application: {},
    vite: {
      resolve: {
        alias: {
          '#': fileURLToPath(new URL('./src', import.meta.url)),
        },
      },
      server: {
        host: '0.0.0.0',
        port: 5174,
        strictPort: true,
        watch: {
          usePolling: true,
        },
      },
      plugins: [
        ElementPlus({
          format: 'esm',
           useSource: true, 
        })
      ]
    }
  }
});