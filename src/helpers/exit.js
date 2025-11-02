export const createGracefulExit = (userName, rl) => {
  return () => {
    console.log(`\nThank you for using File Manager, ${userName}, goodbye!`);
    rl.close();
    process.exit(0);
  };
};
