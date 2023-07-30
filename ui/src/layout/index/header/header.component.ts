import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { IndexService } from '../index.service';
import { NavService } from './../../../services/nav.service';
import { ConfigService } from 'src/services/config.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  constructor(
    public auth: AuthService,
    public indexService: IndexService,
    public router: Router,
    public location: Location,
    public nav: NavService,
    private config: ConfigService
  ) {}

  ngOnInit() {}

  action(type: string) {
    switch (type) {
      case 'logout':
        this.auth.logout().subscribe((x) => {
          if (x) {
            this.indexService.removeSession();
            this.indexService.session = { tabsPage: [] };
            this.nav.destroy();
            this.config.deleteRouteSnapshot();
            this.config.deleteRouteSnapshot(this.location.path());
            this.router.navigate(['/login']);
          }
        });
        break;
    }
  }
}
