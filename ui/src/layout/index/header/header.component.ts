import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { AuthService } from "../../../services/auth.service";
import { IndexService } from "../index.service";
import { ReuseStrategyService } from "../../../services/reuse-strategy.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  constructor(
    public auth: AuthService,
    public indexService: IndexService,
    public router: Router,
    public location: Location
  ) {}

  ngOnInit() {}

  action(type) {
    switch (type) {
      case "logout":
        this.auth.logout().subscribe(x => {
          if (x) {
            this.indexService.removeSession();
            this.indexService.session = { tabsPage: [] };
            ReuseStrategyService.deleteRouteSnapshot();
            ReuseStrategyService.deleteRouteSnapshot(this.location.path());
            this.router.navigate(["/login"]);
          }
        });
        break;
    }
  }
}
