import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { User, UserService } from '@ui/api';
import { BASE_SKIP, BASE_TAKE, BasePagination } from '@ui/core';

export const UsersResolver: ResolveFn<BasePagination<User>> = (_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) => {
  return inject(UserService).users({ skip: BASE_SKIP, take: BASE_TAKE });
};
