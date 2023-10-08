import { Component } from '@angular/core';
import { AppConfigService } from '@ui/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  constructor(public config: AppConfigService) {}
}
