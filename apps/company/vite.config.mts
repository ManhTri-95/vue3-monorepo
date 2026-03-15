import { defineConfig } from '@manhtri/vite-config';
import ElementPlus from 'unplugin-element-plus/vite';

export default defineConfig(async () =>  {
  return {
    application: {},
    vite: {
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