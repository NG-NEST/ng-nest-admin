import { Observable, concatMap } from 'rxjs';
import { AppAuthService } from './auth.service';
import { inject } from '@angular/core';
import { AppPrismService } from './prism.service';
import { AppLocaleService } from './locale.service';
import { AppIconService } from './icon.service';
import { AppThemeService } from './theme.service';

export const AppInitializer = (): Observable<boolean> => {
  const prism = inject(AppPrismService);
  const auth = inject(AppAuthService);
  const locale = inject(AppLocaleService);
  const icon = inject(AppIconService);
  const theme = inject(AppThemeService);
  return locale.init().pipe(
    concatMap(() => icon.init()),
    concatMap(() => theme.init()),
    concatMap(() => prism.init()),
    concatMap(() => auth.canActivate(null, true))
  );
};
