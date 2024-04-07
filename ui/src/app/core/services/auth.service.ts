import { Injectable, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Router } from '@angular/router';
import { XStorageService } from '@ng-nest/ui/core';
import { AuthService, User } from '@ui/api';
import { Observable, concatMap, finalize, map, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppAuthService {
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  localStorage = inject(XStorageService);
  auth = inject(AuthService);
  accessToken = signal(this.localStorage.getLocal('accessToken'));
  refreshToken = signal(this.localStorage.getLocal('refreshToken'));
  userInfo = signal<User | null>(null);

  constructor() {
    effect(() => {
      this.localStorage.setLocal('accessToken', this.accessToken());
    });
    effect(() => {
      this.localStorage.setLocal('refreshToken', this.refreshToken());
    });
  }

  check(route?: ActivatedRouteSnapshot) {
    if (route) {
      const { login } = route.data;
      if (login) {
        if (this.accessToken() && this.accessToken() !== 'null') {
          const url = new URL(location.href);
          const searchParams = new URLSearchParams(url.search);
          const redirect = searchParams.get('redirect');
          if (redirect) {
            return this.verifyToken(this.accessToken()).pipe(
              map((x) => {
                if (x) {
                  location.href = `${redirect}?accessToken=${this.accessToken()}`;
                  return false;
                } else {
                  this.toLoginPage({
                    redirect,
                    appid: searchParams.get('appid')
                  });
                  return true;
                }
              })
            );
          } else {
            return this.verifyToken(this.accessToken()).pipe(
              map((x) => {
                if (x) {
                  this.router.navigateByUrl('/overview');
                } else {
                  this.toLoginPage();
                }
                return x;
              })
            );
          }
        } else {
          return of(true);
        }
      }
    }
    if (this.accessToken() && this.accessToken() !== 'null') {
      return this.verifyToken(this.accessToken()).pipe(
        map((x: boolean) => {
          if (!x) this.toLoginPage();
          return x;
        })
      );
    } else {
      return of(false).pipe(
        map((x) => {
          this.toLoginPage();
          return x;
        })
      );
    }
    if (this.accessToken()) {
      if (!this.userInfo()) {
        return this.getUserInfo();
      } else {
        return of(true);
      }
    } else {
      this.router.navigate(['/login']);
      return of(false);
    }
  }

  verifyToken(accessToken: string): Observable<boolean> {
    return this.auth.verifyToken({ accessToken }).pipe(
      map((x: any) => x.accessToken),
      map((x: boolean) => {
        if (!x) {
          this.accessToken.set('');
        }
        return x;
      })
    );
  }

  getUserInfo() {
    return this.auth.userInfo().pipe(
      tap((user) => {
        this.userInfo.set(user);
      }),
      concatMap(() => {
        return of(true);
      })
    );
  }

  logout() {
    return of(true).pipe(
      finalize(() => {
        this.accessToken.set(null);
        this.refreshToken.set(null);
        this.router.navigate(['/login']);
      })
    );
  }

  toLoginPage(queryParams: Params | null = null) {
    this.router.navigate(['/login'], { queryParams });
  }
}
