import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from 'src/services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'ng-nest-admin-ui';
  constructor(private config: ConfigService, public router: Router) {
    this.config.init();

    this.router.events.subscribe((x) => {
      console.log(x);
    });
  }

  onActivate(event: any) {
    console.log('onActivate', event);
  }
  onDeactivate(event: any) {
    console.log('onDeactivate', event);
  }
  onAttach(event: any) {
    console.log('onAttach', event);
  }
  onDetach(event: any) {
    console.log('onDetach', event);
  }
}
