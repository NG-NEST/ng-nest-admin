import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Prompt, PromptService } from '@ui/api';
import { BASE_SKIP, BASE_TAKE, BasePagination } from '@ui/core';

export const PromptsResolver: ResolveFn<BasePagination<Prompt>> = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
) => {
  return inject(PromptService).prompts({ skip: BASE_SKIP, take: BASE_TAKE });
};
