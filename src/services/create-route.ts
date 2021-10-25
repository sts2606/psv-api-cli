import { getSrcDirPath } from './get-src-dir-path';
import { IMPORT_REQ_RES_LINE } from './constants/commonLines';
import fs from 'fs/promises';
import { HttpMethods } from './enums/http-methods';
import { NameHelper } from './helpers/name-helper';
import path from 'path';
import { API_DIRECTORY } from './constants/file-dir-names';

export const createRoute = async (method: HttpMethods, entity: string) => {
  const content = `${IMPORT_REQ_RES_LINE}

export const ${method}${NameHelper.toUpperCaseFormat(
    entity
  )} = async (req: Request, res: Response) => {
  res.sendStatus(200);
};`;

  const apiSrcPath = await getSrcDirPath();
  if (apiSrcPath) {
    const apiDirPath = path.join(apiSrcPath, API_DIRECTORY, entity);
    fs.mkdir(apiDirPath, { recursive: true });
    await fs.writeFile(
      `${apiDirPath}/${method}${NameHelper.toUpperCaseFormat(entity)}.ts`,
      content
    );
  }
};
