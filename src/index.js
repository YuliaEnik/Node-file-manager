import { getUsername } from './helpers/username.js';
import { createCLI, initFileManager } from './cli/interface.js';
import { handleCommand } from './cli/commands.js';
import { getCurrentDirectory } from './utils/navigation.js';

const userName = getUsername();
const { rl, gracefulExit } = createCLI(userName);

const startCLI = async () => {

  console.log(`Welcome to the File Manager, ${userName}!`);
  

  initFileManager();
  console.log(`You are currently in ${getCurrentDirectory()}`);

  while (true) {
    try {
      const userInput = await rl.question('> ');
      const [command, ...args] = userInput.trim().split(' ');

      const shouldExit = await handleCommand(command, args, gracefulExit);
      if (shouldExit) return;
      
    } catch (error) {
      console.log('Operation failed');
    }
  }
};

startCLI().catch(console.error);

