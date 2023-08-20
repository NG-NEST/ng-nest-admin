import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { User, UserService } from '@ui/api';
import { BasePagination } from '@ui/core';

export const UsersResolver: ResolveFn<BasePagination<User>> = (_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) => {
  return inject(UserService).users({ skip: 0, take: 10 });
};
