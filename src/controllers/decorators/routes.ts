import 'reflect-metadata';
import { RequestHandler } from 'express';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';

interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler
}

function routeBinder(method: string) {
  return function (path: string) {
    return function (target: any, key: string, desc: /* PropertyDescriptor */ RouteHandlerDescriptor) {
      Reflect.defineMetadata(MetadataKeys.PATH, path, target, key);
      Reflect.defineMetadata(MetadataKeys.METHOD, method, target, key);
    }
  }
}

export const get = routeBinder(Methods.GET);
export const put = routeBinder(Methods.PUT);
export const post = routeBinder(Methods.POST);
export const del = routeBinder(Methods.DEL);
export const patch = routeBinder(Methods.PATCH);