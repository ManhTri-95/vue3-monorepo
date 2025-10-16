
import type { DefineApplicationOptions } from "../typing";
import { defineConfig, loadEnv } from "vite";
import { loadLibraryPlugins } from '../plugins';

function defineApplicationConfig (userConfigPromise?: DefineApplicationOptions) {
  return defineConfig(async (config) => {
    const { mode, command } = config;
    const root = process.cwd();
    const env = loadEnv(mode, root);
    const isBuild = command === 'build';
    console.log(env)
    const plugins = await loadLibraryPlugins({
      isBuild,
      mode
    })
    return config
  });
}


export { defineApplicationConfig }