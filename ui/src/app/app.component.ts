import { Component } from '@angular/core';
import { ConfigService } from 'src/services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-nest-admin-ui';
  constructor(private config: ConfigService) {
    this.config.init();
  }
}
