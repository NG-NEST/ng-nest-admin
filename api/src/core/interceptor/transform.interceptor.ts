import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getRequestLogs } from '../common';
import { Logs } from '../config';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = getRequestLogs(context.switchToHttp().getRequest());

    return next.handle().pipe(
      map((data) => {
        const { contextType } = context as any;
        if (contextType === 'graphql') {
        } else {
          const msg = JSON.stringify({
            requset: request,
            response: data,
          });

          Logs.info(msg, 'TransformInterceptor');
        }
        return data;
      }),
    );
  }
}
