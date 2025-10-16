import type { ConfigEnv, UserConfig, PluginOption } from 'vite';

/**
 * Conditional plugin configuration
 * @description is used to dynamically load plugins based on conditions
*/
interface ConditionPlugin {
  /**
   * Condition
   * @description If the condition is true, the plugin is loaded.
   */
  condition?: boolean;
  /**
   * Plugin Object
   * @description Returns an array of plugins or a Promise
   */
  plugins: () => PluginOption[] | PromiseLike<PluginOption[]>;
}

/**
 * Common plugin configuration options
 * @description Basic configuration shared by all plugins
 */
interface CommonPluginOptions {
  /**
   * Whether to enable development tools
   * @default false
   */
  devtools?: boolean;
  /**
   * Is it build mode?
   * @default false
   */
  isBuild?: boolean
  /**
   * Build Mode
   * @default 'development'
   */
  mode?: string
  /**
   * Environment variables
   * @description Custom environment variables
   */
  env?: Record<string, any>;
}

/**
* Application configuration definition function type
* @description Used to define application build configuration
*/
type DefineApplicationOptions = (config?: ConfigEnv) => Promise<{
  /** Vite Configuration */
  vite?: UserConfig
}>;

/**
* Library configuration definition function type
* @description Used to define library build configuration
*/
type DefineLibraryOptions = (config?: ConfigEnv) => Promise<{
  /** Vite Configuration */
  vite?: UserConfig
}>

/**
* Configuration Definition Type
* @description Configuration definition for application or library
*/
type DefineConfig = DefineApplicationOptions | DefineLibraryOptions

export type {
  DefineConfig,
  DefineApplicationOptions,
  CommonPluginOptions,
  ConditionPlugin
}