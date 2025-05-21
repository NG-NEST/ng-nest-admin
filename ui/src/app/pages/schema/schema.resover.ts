import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Schema, SchemaService } from '@ui/api';
import { BASE_SKIP, BASE_TAKE, BasePagination } from '@ui/core';

export const SchemasResolver: ResolveFn<BasePagination<Schema>> = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
) => {
  return inject(SchemaService).schemas({ skip: BASE_SKIP, take: BASE_TAKE });
};
