import fs from 'fs/promises';
import path from 'path';
import { API_DIRECTORY, INDEX_FILE } from './constants/file-dir-names';
import { getSrcDirPath } from './get-src-dir-path';

export const updateRegisterRouter = async (entity: string) => {
  const apiSrcPath = await getSrcDirPath();
  console.log(apiSrcPath);
  if (apiSrcPath) {
    const prevRegisterRouterText = await fs.readFile(
      path.join(apiSrcPath, API_DIRECTORY, INDEX_FILE),
      'utf-8'
    );
    const content = `${prevRegisterRouterText.slice(
      0,
      prevRegisterRouterText.indexOf(';')
    )}
import ${entity}Router from './${entity}';${prevRegisterRouterText.slice(
      prevRegisterRouterText.indexOf(';') + 1,
      prevRegisterRouterText.lastIndexOf('}') - 1
    )}
  app.use('/${entity}s', ${entity}Router);
};`;
    await fs.writeFile(
      path.join(apiSrcPath, API_DIRECTORY, INDEX_FILE),
      content
    );
  }
};
