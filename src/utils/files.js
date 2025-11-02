import { readdir } from 'fs/promises';

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
