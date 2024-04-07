import {
  HttpEvent,
  HttpRequest,
  HttpErrorResponse,
  HttpHandlerFn,
  HttpResponse
} from '@angular/common/http';
import { inject } from '@angular/core';
import { XMessageRef, XMessageService } from '@ng-nest/ui/message';
import { catchError, map, Observable, throwError, timeout } from 'rxjs';
import { AppAuthService } from './auth.service';

let messageRef: XMessageRef;

export function AppNoopInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const message = inject(XMessageService);
  const auth = inject(AppAuthService);
  let headers: { [key: string]: string } = {};
  let addTokens = ['graphql', 'api'];
  let spt = request.url.split('/');
  if (spt.length > 1 && addTokens.includes(spt[1])) {
    let accessToken = auth.accessToken();
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }
  }
  request = request.clone({
    setHeaders: headers
  });
  return next(request).pipe(
    timeout(10000),
    map((x) => {
      if (x instanceof HttpResponse) {
        const body: any = x.body;
        if (body.data === null && body.errors.length > 0) {
          let msgs = body.errors.map((y: any) => y.message);
          let codes = body.errors.map((y: any) => y.code);
          if (codes.includes('UNAUTHENTICATED')) {
            auth.accessToken.set('');
            auth.toLoginPage();
          }
          if (!Boolean(messageRef?.opened())) {
            messageRef = message.error({ content: msgs });
          }
          throwError(() => new Error(msgs));
        }
        return x;
      }
      return x;
    }),
    catchError((x: HttpErrorResponse) => {
      let msg = '请求异常';
      if (x.error && x.error.message) {
        if (x.error.message instanceof Array) {
          msg = x.error.message.join('\n');
        } else {
          msg = x.error.message;
        }
      }
      if (x.status === 401) {
        auth.accessToken.set('');
        auth.toLoginPage();
      }
      if (!Boolean(messageRef?.opened())) {
        messageRef = message.error({ content: msg });
      }

      return throwError(() => new Error(msg));
    })
  );
}
