import type { PluginOption } from 'vite';
import type { ArchiverPluginOptions } from '../typing';
import { join } from 'node:path';
import fsp from 'node:fs/promises';
import fs from 'node:fs';
import archiver from 'archiver';

async function zipFolder(
  folderPath: string,
  outputPath: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outputPath);
    const archive = archiver('zip', {
      zlib: { level: 9 } // Set the compression level to 9 for maximum compression
    });

    output.on('close', () => {
       console.log(
        `ZIP file created: ${outputPath} (${archive.pointer()} total bytes)`,
      );
      resolve();
    });

    archive.on('error', (err) => {
      reject(err);
    });

    archive.pipe(output);
    archive.directory(folderPath, false);
    archive.finalize()
  });
}

/**
 * Vite plugin to automatically compress `dist/` folder into `.zip` file
 * Run after build, using `archiver` library
 */

export const viteArchiverPlugin = (
  options: ArchiverPluginOptions = {}
): PluginOption => {
  return {
    apply: 'build',
    closeBundle: {
      handler() {
        const { name = 'dist', outputDir = '.' } = options;

        setTimeout(async () => {
          // Create output path
          const folderToZip = 'dist';
          const zipOutputDir = join(process.cwd(), outputDir);
          const zipOutputPath = join(zipOutputDir, `${name}.zip`);

          try {
            // Make sure the output directory exists
            await fsp.mkdir(zipOutputDir, { recursive: true })
          } catch {}

          try {
            await zipFolder(folderToZip, zipOutputPath);
            console.log(`Folder has been zipped to: ${zipOutputPath}`);
          } catch (error) {
              console.error('Error zipping folder:', error);
          }
        }, 0)
      },
      order: 'post'
    },
    enforce: 'post', // run last after build is complete
    name: 'vite:archiver'
  }
}