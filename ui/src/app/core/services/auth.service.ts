import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppAuthService {
  check() {
    return of(true);
  }
}
