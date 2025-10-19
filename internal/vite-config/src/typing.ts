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
  env?: Record<string, any>;  /**
   /** Whether to enable HTML plug-in
   * @default true
   */
  html?: boolean;

}



/**
 * Application plugin configuration options
 * @description Used to configure plugin options when building an application
 */
interface ApplicationPluginOptions extends CommonPluginOptions {
  /**
  * Enable or disable compressed archives
  * @default false
  * @description If enabled, a zip file will be generated in the archive directory
  */
  archiver?: boolean,
  /**
  * Compression archive plugin configuration
  * @description Configure compression archive behavior
  */
  archiverPluginOptions?: ArchiverPluginOptions;
}


/**
* Archive plugin configuration options
* @description Used to configure compressed archives of build products
*/
interface ArchiverPluginOptions { 
  /**
   * Output file name
   * @default 'dist'
   */
 name?: string;
  /**
  * Output directory
  * @default '.'
  */
 outputDir?: string;
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
* Print plugin configuration options
* @description Used to configure console printing information
*/
interface PrintPluginOptions {
  /** Print data map
  * @description Data in the form of key-value pairs will be printed to the console
  * @example
  * ```typescript
  * {
  * 'App Version': '1.0.0',
  * 'Build Time': '2024-01-01'
  * }
  * ```
  */
  infoMap?: Record<string, string | undefined>;
}

/**
* Configuration Definition Type
* @description Configuration definition for application or library
*/
type DefineConfig = DefineApplicationOptions | DefineLibraryOptions

export type {
  DefineConfig,
  DefineApplicationOptions,
  ApplicationPluginOptions,
  CommonPluginOptions,
  ConditionPlugin,
  ArchiverPluginOptions,
  PrintPluginOptions
}