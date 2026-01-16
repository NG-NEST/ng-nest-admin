import {
  HttpEvent,
  HttpRequest,
  HttpErrorResponse,
  HttpHandlerFn,
  HttpResponse
} from '@angular/common/http';
import { inject } from '@angular/core';
import { XMessageRef, XMessageService } from '@ng-nest/ui/message';
import { XI18nService } from '@ng-nest/ui/i18n';
import { catchError, map, Observable, throwError, timeout } from 'rxjs';
import { AppAuthService } from './auth.service';
import { isString } from 'lodash-es';

let messageRef: XMessageRef;

export function AppNoopInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const message = inject(XMessageService);
  const auth = inject(AppAuthService);
  const i18n = inject(XI18nService);
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
            messageRef = message.error(msgs);
          }
          throwError(() => new Error(msgs));
        }
        return x;
      }
      return x;
    }),
    catchError((x: HttpErrorResponse) => {
      let msg = i18n.translate('$base.requestError');
      let error = x.error;
      if (isString(error)) {
        try {
          error = JSON.parse(error);
        } catch (e) {}
      }
      if (error && error.message) {
        if (error.message instanceof Array) {
          msg = error.message.join('\n');
        } else {
          msg = error.message;
        }
      }
      if (x.status === 401) {
        auth.accessToken.set('');
        auth.toLoginPage();
      }
      if (!Boolean(messageRef?.opened())) {
        messageRef = message.error(msg);
      }

      return throwError(() => new Error(msg));
    })
  );
}
