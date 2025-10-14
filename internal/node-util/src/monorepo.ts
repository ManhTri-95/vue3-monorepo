import { dirname } from 'node:path';

import { getPackages as getPackagesFunc, getPackagesSync as getPackagesSyncFunc } from '@manypkg/get-packages';
import { findUpSync } from 'find-up';

/**
 * Find the root directory of the warehouse.
 * @param cwd
 */
function findMonorepoRoot (cwd: string = process.cwd()) {
  const lockFile = findUpSync('pnpm-lock.yaml', {
    cwd,
    type: 'file'
  });

  return dirname(lockFile || '');
}

/**
 * Get all packages from the main warehouse
 */
async function getPackages() {
  const root = findMonorepoRoot();
  
  return await getPackagesFunc(root)
}

export { findMonorepoRoot, getPackages }