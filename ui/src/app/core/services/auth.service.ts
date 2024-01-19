import { Injectable, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { XStorageService } from '@ng-nest/ui/core';
import { AuthService, User } from '@ui/api';
import { concatMap, finalize, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppAuthService {
  router = inject(Router);
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

  check() {
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
}
