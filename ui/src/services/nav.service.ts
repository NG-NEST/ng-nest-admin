import { ReuseStrategyService } from "./reuse-strategy.service";
import { Injectable } from "@angular/core";
import { Location } from "@angular/common";
import { Router, NavigationStart, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";
import * as _ from "lodash";

@Injectable({ providedIn: "root" })
export class NavService {
  clearTo: boolean = false;

  history: NavigationEnd[] = [];

  constructor(private router: Router, private location: Location) {
    this.router.events
      .pipe(filter(x => x instanceof NavigationStart))
      .subscribe((x: NavigationStart) => {
        if (this.clearTo) {
          ReuseStrategyService.deleteRouteSnapshot(x.url);
          this.clearTo = false;
        }
      });
    this.router.events
      .pipe(filter(x => x instanceof NavigationEnd))
      .subscribe((x: NavigationEnd) => {
        if (x.url === x.urlAfterRedirects) this.history.unshift(x);
      });
  }

  back(clearTo?: boolean) {
    this.removeThis();
    this.clearTo = clearTo;
    let first = _.first(this.history);
    let urlSplit = _.split(first.url, "/");
    if (urlSplit.length >= 3) {
      let url = _.join(_.take(urlSplit, 3), "/");
      let his = _.find(
        this.history,
        (x: NavigationEnd) =>
          x.id !== first.id && x.url.indexOf(url) === 0 && x.url !== first.url
      );
      if (his) {
        this.router.navigateByUrl(his.url).then(() => {
          _.remove(this.history, x => x.id > his.id);
        });
      } else {
        let url = _.join(_.take(urlSplit, urlSplit.length - 1), "/");
        this.backTo(url, first.url);
      }
      return false;
    }
    window.history.back();
  }

  backTo(url, nowUrl) {
    this.router.navigateByUrl(url).then(() => {
      if (_.first(this.history).urlAfterRedirects === nowUrl) {
        let urlSplit = _.split(url, "/");
        this.backTo(_.join(_.take(urlSplit, urlSplit.length - 1), "/"), nowUrl);
      }
    });
  }

  removeThis() {
    let url = this.location.path();
    ReuseStrategyService.deleteRouteSnapshot(url);
  }
}
