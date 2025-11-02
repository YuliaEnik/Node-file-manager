import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
import { createGracefulExit } from '../helpers/exit.js';
import { initWorkingDirectory, getCurrentDirectory } from '../utils/navigation.js';

export const createCLI = (userName) => {
  const rl = readline.createInterface({ input, output });
  const gracefulExit = createGracefulExit(userName, rl);

  rl.on('SIGINT', gracefulExit);
  process.on('SIGINT', gracefulExit);

  return {
    rl,
    gracefulExit
  };
};

export const initFileManager = () => {
  initWorkingDirectory();
};
