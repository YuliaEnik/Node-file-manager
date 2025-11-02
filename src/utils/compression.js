import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import path from 'path';

export const compressFile = async (srcPath, destPath) => {
  if (!srcPath || !destPath) {
    throw new Error('Invalid input');
  }

  try {
    const srcAbsolutePath = path.resolve(process.cwd(), srcPath);
    const destAbsolutePath = path.resolve(process.cwd(), destPath);
    
    const readStream = createReadStream(srcAbsolutePath);
    const writeStream = createWriteStream(destAbsolutePath);
    const compressStream = createBrotliCompress();
    
    await pipeline(readStream, compressStream, writeStream);
  } catch (error) {
    throw new Error('Operation failed');
  }
};

export const decompressFile = async (srcPath, destPath) => {
  if (!srcPath || !destPath) {
    throw new Error('Invalid input');
  }

  try {
    const srcAbsolutePath = path.resolve(process.cwd(), srcPath);
    const destAbsolutePath = path.resolve(process.cwd(), destPath);

    const readStream = createReadStream(srcAbsolutePath);
    const writeStream = createWriteStream(destAbsolutePath);
    const decompressStream = createBrotliDecompress(); 

    await pipeline(readStream, decompressStream, writeStream);

  } catch (error) {
    throw new Error('Operation failed');
  }
};
