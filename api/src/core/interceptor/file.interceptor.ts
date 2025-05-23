import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { FILE_METADATA } from '../decorators';

@Injectable()
export class FileInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
    let keys = this.reflector.get(FILE_METADATA, context.getHandler()) as string[];

    if (!keys) {
      return next.handle();
    }
    try {
      const req = context.switchToHttp().getRequest();
      const parts = req.parts();
      let body: { [key: string]: any } = {};
      let file: Express.Multer.File;
      for await (let part of parts) {
        const { fieldname } = part;
        if (part.type === 'file' && keys.includes(fieldname)) {
          const buffer = await part.toBuffer();
          const file: Express.Multer.File = {
            fieldname: fieldname,
            originalname: part.filename,
            encoding: part.encoding,
            mimetype: part.mimetype,
            destination: null,
            filename: part.filename,
            path: null,
            size: buffer.length,
            buffer: buffer,
            stream: part.file,
          };
          req[fieldname] = file;
        } else if (part.type === 'field') {
          body[fieldname] = part.value;
        }
      }

      if (file) req.file = file;
      if (Object.keys(body).length > 0) req.body = body;

      return next.handle();
    } catch (e: any) {
      return next.handle();
    }
  }
}
