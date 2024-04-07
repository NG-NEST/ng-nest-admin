import { Observable, mergeMap } from 'rxjs';
import { AppAuthService } from './auth.service';
import { inject } from '@angular/core';
import { AppPrismService } from './prism.service';

export function AppInitializer(): () => Observable<boolean> {
  const prism = inject(AppPrismService);
  const auth = inject(AppAuthService);
  return () => auth.check().pipe(mergeMap(() => prism.init()));
}
