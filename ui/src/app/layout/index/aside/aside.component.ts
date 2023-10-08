import { Component } from '@angular/core';
import { AppConfigService } from '@ui/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent {
  collapsed = false;
  constructor(public config: AppConfigService) {}
}
