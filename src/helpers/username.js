export const getUsername = () => {
  const userNameArg = process.argv.find(arg => arg.startsWith('--username='));
  if (!userNameArg) return 'Dear Guest';
  const value = userNameArg.split('=')[1];
  return value || 'Dear Guest';
};
