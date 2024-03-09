import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Logs, getRequestLogs } from '../config';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = process.hrtime();
    const { contextType } = context as any;
    let request = {};
    if (contextType === 'graphql') {
      request = getRequestLogs(context.getArgByIndex(2).req);
    } else if (contextType === 'http') {
      request = getRequestLogs(context.switchToHttp().getRequest());
    }

    return next.handle().pipe(
      map((data) => {
        const msg = JSON.stringify({
          requset: request,
          response: data,
        });
        const end = process.hrtime(start);
        Logs.http(msg, {
          context: TransformInterceptor.name,
          ms: `+${(end[1] / 1000000).toFixed(0)}ms`,
        });

        return data;
      }),
    );
  }
}
