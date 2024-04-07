import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FastifyRequest } from 'fastify';
import { Observable } from 'rxjs';
import { FILE_METADATA } from '../decorators';

@Injectable()
export class FileInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
    let key = this.reflector.get(FILE_METADATA, context.getHandler());

    if (!key) {
      return next.handle();
    }
    try {
      console.log(key);
      const req = context.switchToHttp().getRequest<FastifyRequest>();
      const parts = req.parts();
      for await (let part of parts) {
        console.log(part);
      }

      return next.handle();
    } catch {
      return next.handle();
    }
  }
}
