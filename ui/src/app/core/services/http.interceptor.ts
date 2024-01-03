import { HttpEvent, HttpRequest, HttpErrorResponse, HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { XStorageService } from '@ng-nest/ui/core';
import { catchError, Observable, of, timeout } from 'rxjs';

function VerifyAuth(_x: HttpErrorResponse, _req: HttpRequest<any>) {
  return of();
}

export const AppNoopInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const storage = inject(XStorageService);
  let headers: { [key: string]: string } = {};
  let accessToken = storage.getLocal('accessToken');
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }
  request = request.clone({
    setHeaders: headers
  });
  return next(request).pipe(
    timeout(10000),
    catchError((x: HttpErrorResponse) => VerifyAuth(x, request))
  );
};
