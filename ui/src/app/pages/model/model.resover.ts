import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Model, ModelService } from '@ui/api';
import { BASE_SKIP, BASE_TAKE, BasePagination } from '@ui/core';

export const ModelsResolver: ResolveFn<BasePagination<Model>> = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
) => {
  return inject(ModelService).models({ skip: BASE_SKIP, take: BASE_TAKE });
};
