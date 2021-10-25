import fs from 'fs/promises';
import { SRC_DIRECTORY } from './constants/file-dir-names';

export const getSrcDirPath = async () => {
  const cwd = process.cwd();
  if (cwd.indexOf(SRC_DIRECTORY)) {
    return `${cwd.substring(0, cwd.indexOf(SRC_DIRECTORY))}${SRC_DIRECTORY}`;
  }
  const rootDir = await fs.readdir(cwd);
  if (rootDir.includes(SRC_DIRECTORY)) {
    return `${cwd}/${SRC_DIRECTORY}`;
  }
  console.error(`Module psv-api-cli cant find ${SRC_DIRECTORY} dir`);
};
