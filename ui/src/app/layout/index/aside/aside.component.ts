import { Component, inject, signal } from '@angular/core';
import { XMenuComponent } from '@ng-nest/ui/menu';
import { AppConfigService } from '@ui/core';
@Component({
  selector: 'app-aside',
  imports: [XMenuComponent],
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent {
  config = inject(AppConfigService);
  collapsed = signal(false);
}
