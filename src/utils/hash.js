import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import path from 'path';

export const calculateFileHash = (filePath) => {
  return new Promise((resolve, reject) => {
    if (!filePath) {
      reject(new Error('Invalid input'));
      return;
    }

    const absolutePath = path.resolve(process.cwd(), filePath);
    const hash = createHash('sha256');
    const readStream = createReadStream(absolutePath);

    readStream.on('data', (chunk) => {
      hash.update(chunk);
    });

    readStream.on('end', () => {
      const fileHash = hash.digest('hex');
      resolve(fileHash);
    });

    readStream.on('error', (error) => {
      reject(new Error('Operation failed'));
    });
  });
};
