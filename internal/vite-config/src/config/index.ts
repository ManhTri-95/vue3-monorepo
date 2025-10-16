import { join } from 'node:path';
import type { DefineConfig } from '../typing';
import { existsSync } from 'node:fs';
import { defineApplicationConfig } from './application';

function defineConfig (
  userConfigPromise?: DefineConfig, 
  type: 'application' | 'auto' | 'library' = 'auto'
) {
  let projectType = type;
  // Automatically determine the type based on whether index.html exists in the package
  if(projectType === 'auto') {
    const htmlPath = join(process.cwd(), 'index.html');
    projectType = existsSync(htmlPath) ? 'application' : 'library';
  }

  switch (projectType) {
    case 'application': {
      return defineApplicationConfig(userConfigPromise);
    }
  }
}

export { defineConfig }


