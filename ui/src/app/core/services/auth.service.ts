import { Injectable, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { XStorageService } from '@ng-nest/ui/core';
import { AuthService, Permission, User } from '@ui/api';
import { Observable, concatMap, finalize, map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppAuthService {
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  localStorage = inject(XStorageService);
  auth = inject(AuthService);
  accessToken = signal(this.localStorage.getLocal('accessToken'));
  refreshToken = signal(this.localStorage.getLocal('refreshToken'));
  userInfo = signal<User | null>(null);
  userPermissions: Map<string, Permission> = new Map([]);

  constructor() {
    effect(() => {
      this.localStorage.setLocal('accessToken', this.accessToken());
    });
    effect(() => {
      this.localStorage.setLocal('refreshToken', this.refreshToken());
    });
  }

  canActivate(route?: ActivatedRouteSnapshot | null, init = false) {
    if (init) {
      return this.verifyLogin();
    }
    if (route && route.data) {
      const { login } = route.data;
      if (login) {
        return of(true);
      }
    }
    if (this.accessToken()) {
      return this.verifyToken().pipe(
        concatMap((x) => {
          if (x) {
            return this.getUserInfo();
          } else {
            this.toLoginPage();
          }
          return of(false);
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
  }

  canLoad(route?: ActivatedRouteSnapshot | null) {
    const data = route?.data!;
    if (!data || this.userPermissions.get(data['permission'])) return of(true);
    return of(false);
  }

  verifyLogin() {
    if (!this.accessToken()) {
      return of(true);
    }
    const url = new URL(location.href);
    const searchParams = new URLSearchParams(url.search);
    const redirect = searchParams.get('redirect');
    if (redirect) {
      return this.verifyToken().pipe(
        map((x) => {
          if (x) {
            location.href = `${redirect}?accessToken=${this.accessToken()}`;
            return false;
          } else {
            this.toLoginPage(true);
            return true;
          }
        })
      );
    } else {
      return this.verifyToken().pipe(
        map((x) => {
          if (!x) {
            this.toLoginPage();
          }
          return x;
        })
      );
    }
  }

  verifyToken(): Observable<boolean> {
    return this.auth.verifyToken({ accessToken: this.accessToken() }).pipe(
      map((x: any) => x.accessToken),
      map((x: boolean) => {
        if (!x) {
          this.clear();
        }
        return x;
      })
    );
  }

  getUserInfo() {
    return this.auth.userInfo().pipe(
      map((user) => {
        this.userInfo.set(user);
        if (user.roles && user.roles.length > 0) {
          for (let item of user.roles) {
            const { role } = item;
            if (!role) continue;
            const { permissions } = role!;
            if (!permissions) continue;
            for (let it of permissions) {
              const { permission } = it;
              if (!permission) continue;
              this.userPermissions.set(permission.code, permission);
            }
          }
        }
        return true;
      })
    );
  }

  hasPermission(code: string) {
    const permission = this.userPermissions.get(code);
    return permission ? true : false;
  }

  logout() {
    return of(true).pipe(
      finalize(() => {
        this.clear();
        this.toLoginPage();
      })
    );
  }

  clear() {
    this.userInfo.set(null);
    this.userPermissions.clear();
    this.accessToken.set(null);
    this.refreshToken.set(null);
  }

  toLoginPage(isRedirect = false) {
    if (isRedirect) {
      const url = new URL(location.href);
      const searchParams = new URLSearchParams(url.search);
      const redirect = searchParams.get('redirect');
      if (redirect !== null) {
        this.router.navigate(['/login'], { queryParams: { redirect } });
      } else {
        this.router.navigate(['/login']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
}
