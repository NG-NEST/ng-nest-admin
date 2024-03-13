import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getRequestLogs } from '../config';
import { Request } from 'express';
import { HEADER_REQUEST_DATA, HEADER_RESPONSE_DATA } from '../common';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { contextType } = context as any;
    let req!: Request | any;
    if (contextType === 'graphql') {
      req = context.getArgByIndex(2).req;
    } else if (contextType === 'http') {
      req = context.switchToHttp().getRequest();
    }
    if (req !== null) {
      const requestData = getRequestLogs(req);
      req.headers[HEADER_REQUEST_DATA] = requestData;
    }

    return next.handle().pipe(
      map((data) => {
        if (req !== null) {
          req.headers[HEADER_RESPONSE_DATA] = data;
        }
        return data;
      }),
    );
  }
}
