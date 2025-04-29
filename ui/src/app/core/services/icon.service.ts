import { Injectable, inject } from '@angular/core';
import { XIconService } from '@ng-nest/ui/icon';
import { of } from 'rxjs';
import { IconConfig } from 'src/app/icon.config';

@Injectable({ providedIn: 'root' })
export class AppIconService {
  icon = inject(XIconService);

  init() {
    for (let ext in IconConfig) {
      this.icon.register(`admin:${ext}`, IconConfig[ext]);
    }
    return of(true);
  }
}
