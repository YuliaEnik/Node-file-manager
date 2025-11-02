import os from 'os';
import { homedir } from 'os';

export const getOSInfo = (flag) => {
  switch (flag) {
    case '--EOL':
      return getEOL();
    
    case '--cpus':
      return getCPUs();
    
    case '--homedir':
      return getHomeDir();
    
    case '--username':
      return getSystemUsername();
    
    case '--architecture':
      return getArchitecture();
    
    default:
      throw new Error('Invalid input');
  }
};

const getEOL = () => {
  const eol = os.EOL;
  const eolMap = {
    '\n': '\\n (LF)',
    '\r\n': '\\r\\n (CRLF)'
  };
  return `Default system EOL: ${eolMap[eol] || JSON.stringify(eol)}`;
};

const getCPUs = () => {
  const cpus = os.cpus();
  const result = [];
  
  result.push(`Total CPUs: ${cpus.length}`);
  result.push('CPU models:');
  
  cpus.forEach((cpu, index) => {
    result.push(`  ${index + 1}. ${cpu.model} - ${(cpu.speed / 1000).toFixed(2)} GHz`);
  });
  
  return result.join('\n');
};

const getHomeDir = () => {
  return `Home directory: ${homedir()}`;
};

const getSystemUsername = () => {
  const username = os.userInfo().username;
  return `System username: ${username}`;
};

const getArchitecture = () => {
  return `CPU architecture: ${os.arch()}`;
};
