import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

export const UploadFormData = createParamDecorator(async (field: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest() as FastifyRequest;
  const formData = await request.formData();
  if (field) {
    const result: any = [];
    formData.forEach((value, key) => {
      if (key === field) {
        result.push(value);
      }
    });
    if (result.length === 0) {
      return null;
    } else if (result.length === 1) {
      return result[0];
    } else {
      return result;
    }
  }
  return formData;
});
