import { Observable } from 'rxjs';
import { AppAuthService } from './auth.service';

export function AppInitializer(auth: AppAuthService): () => Observable<any> {
  return () => {
    return auth.check();
  };
}
