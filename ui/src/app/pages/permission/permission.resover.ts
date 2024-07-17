import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Permission, PermissionService } from '@ui/api';
import { BASE_SKIP, BASE_TAKE, BasePagination } from '@ui/core';

export const PermissionResolver: ResolveFn<BasePagination<Permission>> = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
) => {
  return inject(PermissionService).permissions({ skip: BASE_SKIP, take: BASE_TAKE });
};
