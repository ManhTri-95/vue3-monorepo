import { promises as fs } from 'node:fs';
import { join, normalize } from 'node:path';

const rootDir = process.cwd();

// Control the number of concurrent tasks to avoid creating too many concurrent tasks
const CONCURRENCY_LIMIT = 10;

//Directories that need to be skipped to avoid entering these directories for cleaning
const SKIP_DIRS = new Set(['.DS_Store', '.git', '.idea', '.vscode']);


/**
* Xử lý một mục tệp/thư mục duy nhất
* @param {string} currentDir - Đường dẫn thư mục hiện tại
* @param {string} item - Tên tệp/thư mục
* @param {string[]} targets - Danh sách các mục tiêu cần xóa
* @param {number} _depth - Độ sâu đệ quy hiện tại
* @returns {Promise<boolean>} - Có cần đệ quy thêm không
*/
async function processItem(currentDir, item, targets, _depth) { 
  // Skip special directories
  if (SKIP_DIRS.has(item)) {
    return false;
  }
  try { 
    const itemPath = normalize(join(currentDir, item));
    if (targets.includes(item)) { 
      // Delete directly when matching the target directory or file
      await fs.rm(itemPath, { force: true, recursive: true });
      console.log(`✅ Deleted: ${itemPath}`);
      return false; 
    }
    return true;
  } catch (error) { 
    if (error.code === 'ENOENT') {
      // The file does not exist and may have been deleted. This is normal.
      return false;
    } else if (error.code === 'EPERM' || error.code === 'EACCES') {
      console.error(`❌ Permission denied: ${item} in ${currentDir}`);
    } else {
      console.error(
        `❌ Error handling item ${item} in ${currentDir}: ${error.message}`,
      );
    }
    return false;
  }
}

/**
* Tìm kiếm và xóa thư mục đích theo phương pháp đệ quy (phiên bản tối ưu hóa đồng thời)
* @param {string} currentDir - Đường dẫn của thư mục hiện đang được duyệt
* @param {string[]} targets - Danh sách các mục tiêu cần xóa
* @param {number} depth - Độ sâu đệ quy hiện tại, để tránh đệ quy quá mức
*/
async function cleanTargetsRecursively(currentDir, targets, depth = 0) { 
  // Giới hạn độ sâu đệ quy để tránh đệ quy vô hạn
  if (depth > 10) {
    console.warn(`Max recursion depth reached at: ${currentDir}`);
    return;
  }

  let dirents;

  
  try {
    dirents = await fs.readdir(currentDir, { withFileTypes: true });
  } catch (error) { 
    console.warn(`Cannot read directory ${currentDir}: ${error.message}`);
    return;
  }

  for (let i = 0; i < dirents.length; i += CONCURRENCY_LIMIT) {
    const batch = dirents.slice(i, i + CONCURRENCY_LIMIT);

    const tasks = batch.map(async (dirent) => {
      const item = dirent.name;
      const shouldRecurse = await processItem(currentDir, item, targets, depth);

      // Nếu đó là một thư mục và chưa bị xóa, hãy xử lý nó theo cách đệ quy
      if (shouldRecurse && dirent.isDirectory()) {
        const itemPath = normalize(join(currentDir, item));
        return cleanTargetsRecursively(itemPath, targets, depth + 1);
      }

      return null;
    });

    // Thực hiện đồng thời loạt tác vụ hiện tại
    const results = await Promise.allSettled(tasks);

    // Kiểm tra xem có tác vụ nào bị lỗi không (tùy chọn: để gỡ lỗi)
    const failedTasks = results.filter(
      (result) => result.status === 'rejected',
    );
    if (failedTasks.length > 0) {
      console.warn(
        `${failedTasks.length} tasks failed in batch starting at index ${i} in directory: ${currentDir}`,
      );
    }
  }
}

(async function startCleanup() {
  // The directory and file name to be deleted
  const targets = ['node_modules', 'dist', '.turbo', 'dist.zip'];
  const deleteLockFile = process.argv.includes('--del-lock');
  const cleanupTargets = [...targets];

  if (deleteLockFile) {
    cleanupTargets.push('pnpm-lock.yaml');
  }

  console.log(
    `🚀 Starting cleanup of targets: ${cleanupTargets.join(', ')} from root: ${rootDir}`,
  );

  const startTime = Date.now();
  try {
    // First count the number of targets to be deleted
    console.log('📊 Scanning for cleanup targets...');

    await cleanTargetsRecursively(rootDir, cleanupTargets);
    const endTime = Date.now();
    console.log(
      `🎉 Cleanup completed in ${(endTime - startTime) / 1000}s`,
    );
  } catch (error) {
    console.error(`💥 Unexpected error during cleanup: ${error.message}`);
    process.exit(1);
  }
})();