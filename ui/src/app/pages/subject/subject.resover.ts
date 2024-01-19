import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Subject, SubjectService } from '@ui/api';
import { BASE_SKIP, BASE_TAKE, BasePagination } from '@ui/core';

export const SubjectsResolver: ResolveFn<BasePagination<Subject>> = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
) => {
  return inject(SubjectService).subjects({ skip: BASE_SKIP, take: BASE_TAKE });
};
