import { chdir, cwd } from 'process';
import { homedir } from 'os';
import path from 'path';

export const initWorkingDirectory = () => {
  const homeDir = homedir();
  chdir(homeDir);
  return cwd();
};

export const getCurrentDirectory = () => {
  return cwd();
};

export const navigateUp = () => {
  const currentDir = cwd();
  const parentDir = path.resolve(currentDir, '..');
  
  if (parentDir !== currentDir) {
    try {
      chdir('..');
      return true;
    } catch (error) {
      throw new Error('Operation failed');
    }
  }
  return false;
};

export const changeDirectory = (targetPath) => {
  if (!targetPath) {
    throw new Error('Invalid input');
  }

  try {
    const currentDir = cwd();
    const newDir = path.resolve(currentDir, targetPath);
    chdir(newDir);
    return true;
  } catch (error) {
    throw new Error('Operation failed');
  }
};
