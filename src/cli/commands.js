import { navigateUp, changeDirectory, getCurrentDirectory } from '../utils/navigation.js';
import { 
  listDirectory, 
  readFile, 
  createFile, 
  createDirectory, 
  renameFile, 
  copyFile, 
  moveFile, 
  deleteFile 
} from '../utils/files.js';

const exitCommands = new Set(['.exit', 'exit', 'quit', 'q', ':q', 'stop']);

export const handleCommand = async (command,args, gracefulExit) => {
  const fullCommand = command.toLowerCase();

  if (exitCommands.has(fullCommand)) {
    gracefulExit();
    return true;
  }

  try {
    switch (fullCommand) {
      case 'up':
        await handleUp();
        break;
      
      case 'cd':
        await handleCd(args[0]);
        break;
      
      case 'ls':
        await handleLs();
        break;

       case 'cat':
        await handleCat(args[0]);
        break;
      
      case 'add':
        await handleAdd(args[0]);
        break;
      
      case 'mkdir':
        await handleMkdir(args[0]);
        break;
      
      case 'rn':
        await handleRn(args[0], args[1]);
        break;
      
      case 'cp':
        await handleCp(args[0], args[1]);
        break;
      
      case 'mv':
        await handleMv(args[0], args[1]);
        break;
      
      case 'rm':
        await handleRm(args[0]);
        break;
      
      case '':
        break;
      
      default:
        console.log('Invalid input');
    }
  } catch (error) {
    console.log(error.message);
  }
  
  console.log(`You are currently in ${getCurrentDirectory()}`);
  return false;
};

const handleUp = async () => {
  navigateUp();
};

const handleCd = async (path) => {
  if (!path) {
    throw new Error('Invalid input');
  }
  changeDirectory(path);
};

const handleLs = async () => {
  const items = await listDirectory();
  if (items.length > 0) {
    console.table(items);
  } else {
    console.log('Directory is empty');
  }
};

const handleCat = async (filePath) => {
  if (!filePath) {
    throw new Error('Invalid input');
  }
  await readFile(filePath);
};

const handleAdd = async (fileName) => {
  if (!fileName) {
    throw new Error('Invalid input');
  }
  await createFile(fileName);
};

const handleMkdir = async (dirName) => {
  if (!dirName) {
    throw new Error('Invalid input');
  }
  await createDirectory(dirName);
};

const handleRn = async (oldPath, newName) => {
  if (!oldPath || !newName) {
    throw new Error('Invalid input');
  }
  await renameFile(oldPath, newName);
};

const handleCp = async (srcPath, destPath) => {
  if (!srcPath || !destPath) {
    throw new Error('Invalid input');
  }
  await copyFile(srcPath, destPath);
};

const handleMv = async (srcPath, destPath) => {
  if (!srcPath || !destPath) {
    throw new Error('Invalid input');
  }
  await moveFile(srcPath, destPath);
};

const handleRm = async (filePath) => {
  if (!filePath) {
    throw new Error('Invalid input');
  }
  await deleteFile(filePath);
};
