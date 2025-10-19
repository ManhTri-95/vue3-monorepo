
import type { UserConfig, CSSOptions  } from 'vite';
import type { DefineApplicationOptions } from "../typing";
import path, { relative } from 'node:path';
import { defineConfig, loadEnv, mergeConfig } from "vite";
import { findMonorepoRoot } from '@manhtri/node-utils';
import { NodePackageImporter } from 'sass';
import { loadApplicationPlugins } from '../plugins';
import { getCommonConfig } from './common';

function defineApplicationConfig (userConfigPromise?: DefineApplicationOptions) {
  return defineConfig(async (config) => {
    const { mode, command } = config;
    const root = process.cwd();
    const env = loadEnv(mode, root);
    const isBuild = command === 'build';
   
    const plugins = await loadApplicationPlugins({
      archiver: true,
      archiverPluginOptions: {},
      env,
      isBuild,
      html: true,
      devtools: true,
      mode
    });

    const applicationConfig: UserConfig = {
      build: {
        rollupOptions: {
          output: {
            assetFileNames: '[ext]/[name]-[hash].[ext]',
            chunkFileNames: 'js/[name]-[hash].js',
            entryFileNames: 'jse/index-[name]-[hash].js',
          }
        },
        target: 'es2015'
      },
      css: createCssOptions(true),
      esbuild: {
        drop: isBuild 
          ? ['debugger']
          : [],
        legalComments: 'none'
      },
      plugins,
      server: {
        host: true,
        warmup: { 
          clientFiles: [
            './index.html',
            //'./src/bootstrap.ts',
            './src/{views,layouts,router,store,api,adapter}/*',
          ],
        }
      }
    };

    const mergedCommonConfig = mergeConfig(
      await getCommonConfig(),
      applicationConfig
    ) 
    return mergedCommonConfig
  });
}

function createCssOptions (injectGlobalScss = true): CSSOptions {
  const root = findMonorepoRoot();
  return {
    preprocessorOptions: injectGlobalScss 
      ? {
        scss: {
          additionalData: (content: string, filepath: string) => {
            const relativePath = relative(root, filepath);
            // Packages under apps inject global styles

            if (relativePath.startsWith(`app${path.sep}`)) {
              // import style-global
              return ''
            }
            return content
          }
        },
        api: 'modern',
        importers: [new NodePackageImporter()],
      } 
      : {}
  }
}

export { defineApplicationConfig }