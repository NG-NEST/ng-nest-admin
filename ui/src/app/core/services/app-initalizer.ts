import { Observable, concatMap } from 'rxjs';
import { AppAuthService } from './auth.service';
import { inject } from '@angular/core';
import { AppPrismService } from './prism.service';
import { AppLocaleService } from './locale.service';

export function AppInitializer(): () => Observable<boolean> {
  const prism = inject(AppPrismService);
  const auth = inject(AppAuthService);
  const locale = inject(AppLocaleService);
  return () =>
    locale.init().pipe(
      concatMap(() => auth.check(null, true)),
      concatMap(() => prism.init())
    );
}
