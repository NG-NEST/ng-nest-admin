import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { SchemaData, SchemaDataService } from '@ui/api';
import { BASE_SKIP, BASE_TAKE, BasePagination } from '@ui/core';

export const SchemaDatasResolver: ResolveFn<BasePagination<SchemaData>> = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
) => {
  return inject(SchemaDataService).schemaDatas({ skip: BASE_SKIP, take: BASE_TAKE });
};
