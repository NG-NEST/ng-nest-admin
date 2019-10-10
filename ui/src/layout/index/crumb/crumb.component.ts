import { ReuseStrategyService } from "./../../../services/reuse-strategy.service";
import { Router } from "@angular/router";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { IndexService } from "../index.service";
import { NavService } from "./../../../services/nav.service";
import * as _ from "lodash";

@Component({
  selector: "app-crumb",
  templateUrl: "./crumb.component.html",
  encapsulation: ViewEncapsulation.None
})
export class CrumbComponent implements OnInit {
  constructor(
    public indexService: IndexService,
    public router: Router,
    public nav: NavService
  ) {}

  ngOnInit() {}

  reload() {
    let url = this.nav.getUrl(this.router.url);
    url.param.timestamp = new Date().getTime();
    ReuseStrategyService.deleteRouteSnapshot(url.path);
    _.remove(this.nav.history, _.first(this.nav.history));
    this.router.navigate([url.path, url.param]);
  }

  back() {
    this.nav.back();
  }

  forward() {}
}
