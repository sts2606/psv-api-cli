import fs from 'fs/promises';
import { NameHelper } from './helpers/name-helper';
import { getSrcDirPath } from './get-src-dir-path';
import path from 'path';
import { HttpMethods } from './enums/http-methods';
import { API_DIRECTORY, INDEX_FILE } from './constants/file-dir-names';

export const createRegisterRoutes = async (
  entity: string,
  methods: HttpMethods[]
) => {
  const routerImports = methods
    .map(
      (method) =>
        `import { ${method}${NameHelper.toUpperCaseFormat(
          entity
        )} } from './${method}${NameHelper.toUpperCaseFormat(entity)}';\n`
    )
    .join('');

  const routerAssign = methods
    .map(
      (method) =>
        `router.${method}('/', ${method}${NameHelper.toUpperCaseFormat(
          entity
        )});\n`
    )
    .join('');

  const content = `import { Router } from 'express';
${routerImports}
const router = Router();

${routerAssign}
export default router;`;

  const apiSrcPath = await getSrcDirPath();
  if (apiSrcPath) {
    const apiDirPath = path.join(apiSrcPath, API_DIRECTORY, entity);
    await fs.writeFile(`${apiDirPath}/${INDEX_FILE}`, content);
  }
};
