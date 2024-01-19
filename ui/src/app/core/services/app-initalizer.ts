import { Observable } from 'rxjs';
import { AppAuthService } from './auth.service';
import { inject } from '@angular/core';

export function AppInitializer(): () => Observable<boolean> {
  const auth = inject(AppAuthService);
  return () => auth.check();
}
