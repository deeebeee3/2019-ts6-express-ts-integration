import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { Methods } from './Methods';


export function controller(routePrefix: string) {
  return function (target: Function /* constructor function */) {

    const router = AppRouter.getInstance();

    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];

      /* path and method metadata was added with the get decorator */
      const path = Reflect.getMetadata('path', target.prototype, key);
      const method: Methods = Reflect.getMetadata('method', target.prototype, key);

      if (path) {
        router[method](`${routePrefix}${path}`, routeHandler);
      }
    }
  }
}