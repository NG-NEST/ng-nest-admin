import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';

import { catchError, Observable, of, timeout } from 'rxjs';

@Injectable()
export class AppNoopInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers: { [key: string]: string } = {};
    let accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }
    req = req.clone({
      setHeaders: headers
    });
    return next.handle(req).pipe(
      timeout(10000),
      catchError((x: HttpErrorResponse) => this.verifyAuth(x, req))
    );
  }

  verifyAuth(_x: HttpErrorResponse, _req: HttpRequest<any>) {
    return of();
  }
}
