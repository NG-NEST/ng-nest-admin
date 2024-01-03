import { Component } from '@angular/core';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XCrumbComponent } from '@ng-nest/ui/crumb';
import { AppConfigService } from '@ui/core';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [XCrumbComponent, XIconComponent],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  constructor(public config: AppConfigService) {}
}
