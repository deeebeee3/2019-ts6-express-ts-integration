import 'reflect-metadata';
import { MetadataKeys } from './MetadataKeys';

export function bodyValidator(...keys: string[]) {
  return function (target: any, key, desc: PropertyDescriptor) {
    Reflect.defineMetadata(MetadataKeys.VALIDATOR, keys, target, key);
  }
}