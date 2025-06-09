import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

export const UploadBody = createParamDecorator(async (_field: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest() as FastifyRequest;
  const formData = await request.formData();

  const result: { [field: string]: any } = {};

  formData.forEach((value, key) => {
    if (Array.isArray(value)) {
      if (!result[key]) {
        result[key] = [];
      }
      for (let val of value) {
        if (!(val instanceof File)) {
          result[key].push(val);
        }
      }
    } else {
      if (!(value instanceof File)) {
        if (result[key]) {
          result[key] = [result[key]];
          result[key].push(value);
        } else {
          result[key] = value;
        }
      }
    }
  });

  return result;
});
