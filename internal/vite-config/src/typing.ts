import type { ConfigEnv, UserConfig, PluginOption } from 'vite';

/****
* Application configuration definition function type
* @description Used to define application build configuration
*/
type DefineApplicationOptions = (config?: ConfigEnv) => Promise<{
  /** Vite Configuration */
  vite?: UserConfig
}>;

/****
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
  DefineApplicationOptions
}