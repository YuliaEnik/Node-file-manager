import { navigateUp, changeDirectory, getCurrentDirectory } from '../utils/navigation.js';
import { listDirectory } from '../utils/files.js';

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
