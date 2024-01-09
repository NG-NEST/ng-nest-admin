import { Injectable, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { XStorageService } from '@ng-nest/ui/core';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppAuthService {
  router = inject(Router);
  localStorage = inject(XStorageService);
  accessToken = signal(this.localStorage.getLocal('accessToken'));
  constructor() {
    effect(() => {
      this.localStorage.setLocal('accessToken', this.accessToken());
    });
  }

  check() {
    if (this.accessToken()) {
      // if (!this.user) {
      //   return this.getUserInfo();
      // } else {
      return of(true);
      // }
    } else {
      this.router.navigate(['/login']);
      return of(false);
    }
  }
}
