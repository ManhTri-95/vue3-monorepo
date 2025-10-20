
import type { Config } from 'tailwindcss';
import path from 'node:path';
import { getPackagesSync } from "@manypkg/get-packages";

const { packages } = getPackagesSync(process.cwd());

const tailwindPackages: string[] = [];

packages.forEach((pkg) =>  {
    tailwindPackages.push(pkg.dir);
})

export default {
  content: [
    './index.html',
    ...tailwindPackages.map((item) => 
      path.join(item, 'src/**/*.{vue,js,ts,jsx,tsx,svelte,astro,html}'),
    )
  ],
  extend: {},
  darkMode: 'selector',
  safelist: ['dark'],
} as Config;