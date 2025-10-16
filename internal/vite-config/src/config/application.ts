
import type { DefineApplicationOptions } from "../typing"
import { defineConfig, loadEnv } from "vite"

function defineApplicationConfig (userConfigPromise?: DefineApplicationOptions) {
  return defineConfig(async (config) => {
    const { mode, command } = config;
    const root = process.cwd();
    const env = loadEnv(mode, root);


    return config
  });
}


export { defineApplicationConfig }