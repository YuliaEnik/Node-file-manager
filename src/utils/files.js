import { readdir, writeFile, mkdir, rename, unlink, stat } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';

export const listDirectory = async () => {
  try {
    const items = await readdir(process.cwd(), { withFileTypes: true });
    
    const directories = items
      .filter(item => item.isDirectory())
      .map(dir => ({ Name: dir.name, Type: 'directory' }))
      .sort((a, b) => a.Name.localeCompare(b.Name));
    
    const files = items
      .filter(item => item.isFile())
      .map(file => ({ Name: file.name, Type: 'file' }))
      .sort((a, b) => a.Name.localeCompare(b.Name));
    
    return [...directories, ...files];
  } catch (error) {
    throw new Error('Operation failed');
  }
};

export const readFile = (filePath) => {
  return new Promise((resolve, reject) => {
    if (!filePath) {
      reject(new Error('Invalid input'));
      return;
    }

    const absolutePath = path.resolve(process.cwd(), filePath);
    const readStream = createReadStream(absolutePath, 'utf8');

    readStream.on('data', (chunk) => {
      process.stdout.write(chunk);
    });

    readStream.on('end', () => {
      console.log('');
      resolve();
    });

    readStream.on('error', (error) => {
      reject(new Error('Operation failed'));
    });
  });
};

export const createFile = async (fileName) => {
  if (!fileName) {
    throw new Error('Invalid input');
  }

  try {
    await writeFile(path.resolve(process.cwd(), fileName), '');
  } catch (error) {
    throw new Error('Operation failed');
  }
};

export const createDirectory = async (dirName) => {
  if (!dirName) {
    throw new Error('Invalid input');
  }

  try {
    await mkdir(path.resolve(process.cwd(), dirName));
  } catch (error) {
    throw new Error('Operation failed');
  }
};

export const renameFile = async (oldPath, newName) => {
  if (!oldPath || !newName) {
    throw new Error('Invalid input');
  }

  try {
    const oldAbsolutePath = path.resolve(process.cwd(), oldPath);
    const newAbsolutePath = path.resolve(process.cwd(), newName);
    
    await rename(oldAbsolutePath, newAbsolutePath);
  } catch (error) {
    throw new Error('Operation failed');
  }
};

export const copyFile = async (srcPath, destPath) => {
  if (!srcPath || !destPath) {
    throw new Error('Invalid input');
  }

  try {
    const srcAbsolutePath = path.resolve(process.cwd(), srcPath);
    const destAbsolutePath = path.resolve(process.cwd(), destPath);

    const srcStats = await stat(srcAbsolutePath);
    if (!srcStats.isFile()) {
      throw new Error('Operation failed');
    }
    const readStream = createReadStream(srcAbsolutePath);
    const writeStream = createWriteStream(destAbsolutePath);
    
    await pipeline(readStream, writeStream);
  } catch (error) {
    throw new Error('Operation failed');
  }
};

export const moveFile = async (srcPath, destPath) => {
  if (!srcPath || !destPath) {
    throw new Error('Invalid input');
  }

  try {
    await copyFile(srcPath, destPath);
    
    const srcAbsolutePath = path.resolve(process.cwd(), srcPath);
    await unlink(srcAbsolutePath);
  } catch (error) {
    throw new Error('Operation failed');
  }
};

export const deleteFile = async (filePath) => {
  if (!filePath) {
    throw new Error('Invalid input');
  }

  try {
    const absolutePath = path.resolve(process.cwd(), filePath);
    await unlink(absolutePath);
  } catch (error) {
    throw new Error('Operation failed');
  }
};
