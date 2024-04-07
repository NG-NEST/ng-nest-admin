import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AppAuthService } from './auth.service';

export const AppCanActivate: CanActivateFn = (route) => {
  return inject(AppAuthService).check(route);
};
