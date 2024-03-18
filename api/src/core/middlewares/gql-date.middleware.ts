import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';
import { isNotEmpty, isString } from 'class-validator';

export const GqlDateMiddleware: FieldMiddleware = async (_ctx: MiddlewareContext, next: NextFn) => {
  const value = await next();
  if (isNotEmpty(value) && isString(value)) {
    try {
      const date = new Date(value);
      return date;
    } catch {}
  }
  return value;
};
