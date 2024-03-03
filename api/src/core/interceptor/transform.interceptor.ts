import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        console.log(data);
        const { contextType } = context as any;
        // let req = context.getArgByIndex(1).req;
        if (contextType === 'graphql') {
        } else {
          //       const logFormat = ` [Request original url]: ${req.originalUrl}
          // [Method]: ${req.method}
          // [IP]: ${req.ip}
          // [User]: ${JSON.stringify(req.user)}
          // [Response data]: ${JSON.stringify(data)}`;
          console.log(JSON.stringify(data));
        }

        return data;
      }),
    );
  }
}
