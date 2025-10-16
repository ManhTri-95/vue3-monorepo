import type { PluginOption } from 'vite';
import type { CommonPluginOptions, ConditionPlugin  } from '../typing';
import viteVue from '@vitejs/plugin-vue';

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
async function loadCommonPlugins(options: CommonPluginOptions): Promise<ConditionPlugin[]> {
  const { devtools, isBuild } = options;
  return [
    {
      condition: true,
      plugins: () => [
        viteVue({
          script: {
            defineModel: true,
          }
        })
      ]
    }
  ]
}

/**
 * @param options Get the vite plug-in of the application type according to the conditions
 */
async function loadLibraryPlugins(options: CommonPluginOptions): Promise<PluginOption[]> {
  const commonPlugins = await loadCommonPlugins(options);

  return await loadConditionPlugins([
    ...commonPlugins
  ]);
}

export {
  loadLibraryPlugins
}