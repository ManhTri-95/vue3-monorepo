import type { PluginOption } from 'vite';
import type { CommonPluginOptions, ConditionPlugin, ApplicationPluginOptions  } from '../typing';
import vue from '@vitejs/plugin-vue';

import { viteArchiverPlugin } from './archiver';
import viteVueDevTools from 'vite-plugin-vue-devtools';
import { createHtmlPlugin as viteHtmlPlugin } from 'vite-plugin-html';

/**
 * @param conditionPlugins
 */
async function loadConditionPlugins (conditionPlugins: ConditionPlugin[]) {
  const plugins: PluginOption[] = [];
  for (const conditionPlugin of  conditionPlugins) {
    if (conditionPlugin.condition) {
      const realPlugins = await conditionPlugin.plugins();
      plugins.push(...realPlugins);
    }
  }
  return plugins.flat();
}

/**
 * general vite plugins based on conditions
 */
async function loadCommonPlugins(
  options: CommonPluginOptions
): Promise<ConditionPlugin[]> {
  const { 
    devtools, 
    isBuild } = options;
  return [
    {
      condition: true,
      plugins: () => [
        vue({
          script: {
            defineModel: true
          }
        }),
      ]
    },
    {
      condition: !isBuild && devtools,
      plugins: () => [viteVueDevTools()]
    }
  ]
}

/**
 * @param options Get the vite plug-in of the application type according to the conditions
 */
async function loadLibraryPlugins(options: CommonPluginOptions): Promise<PluginOption[]> {
  const commonPlugins = await loadCommonPlugins(options);

  return await loadConditionPlugins([
    ...commonPlugins,
  ]);
}

async function loadApplicationPlugins(options: ApplicationPluginOptions): Promise<PluginOption[]> {
  const isBuild = options.isBuild;
  const env = options.env;

  const { 
    archiver,
    archiverPluginOptions,
    html,
    ...commonOptions
  } = options;

  const commonPlugins = await loadCommonPlugins(commonOptions);

  return await loadConditionPlugins([
    ...commonPlugins,
    {
      condition: archiver,
      plugins: async () => {
        return [await viteArchiverPlugin(archiverPluginOptions)];
      }
    },
    {
      condition: !!html,
      plugins: () => [viteHtmlPlugin({ minify: true })],
    },
  ]);
}

 export {
  loadLibraryPlugins,
  loadApplicationPlugins
}