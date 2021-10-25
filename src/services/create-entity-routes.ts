import { updateRegisterRouter } from './update-register-router';
import { HttpMethods } from './enums/http-methods';
import { createRoute } from './create-route';
import { createRegisterRoutes } from './create-register-routes';

export const createEntityRoutes = async (entity: string) => {
  const methods = [
    HttpMethods.GET,
    HttpMethods.POST,
    HttpMethods.PUT,
    HttpMethods.PATCH,
    HttpMethods.DELETE,
  ];

  try {
    await Promise.all(methods.map((method) => createRoute(method, entity)));
    await createRegisterRoutes(entity, methods);
    await updateRegisterRouter(entity);
  } catch (error) {
    console.error('Please provide correct entity name');
  }
};
