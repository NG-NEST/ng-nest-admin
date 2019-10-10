import { ReuseStrategyService } from "./reuse-strategy.service";
import { Injectable } from "@angular/core";
import { Location } from "@angular/common";
import { Router, NavigationStart, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";
import * as _ from "lodash";
import { Subscription } from "rxjs";

@Injectable({ providedIn: "root" })
export class NavService {
  clearTo: boolean = false;

  history: NavigationEnd[] = [];

  first: NavigationEnd;

  last: NavigationEnd;

  now: NavigationEnd;

  disabledBack: boolean = true;

  disabledForward: boolean = true;

  subscriptions: Subscription[] = [];

  constructor(private router: Router, private location: Location) {}

  init() {
    if (this.subscriptions.length > 0) {
      this.destroy();
    } else {
      this.subscriptions = [
        this.router.events
          .pipe(filter(x => x instanceof NavigationStart))
          .subscribe((x: NavigationStart) => {
            if (this.clearTo) {
              ReuseStrategyService.deleteRouteSnapshot(x.url);
              this.clearTo = false;
            }
          }),
        this.router.events
          .pipe(filter(x => x instanceof NavigationEnd))
          .subscribe((x: NavigationEnd) => {
            if (x.url === x.urlAfterRedirects) {
              this.history.unshift(x);
              this.first = _.first(this.history);
              this.last = _.last(this.history);
              this.now = x;
            }
          })
      ];
    }
  }

  destroy() {
    this.history = [];
    this.disabledBack = true;
    this.disabledForward = true;
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

  getUrl(path: string): { path: string; param: any } {
    let result = {
      path: "",
      param: {}
    };
    if (path.indexOf(";") > -1) {
      let spt = path.split(";");
      result.path = spt[0];
      for (let i = 1; i < spt.length; i++) {
        let st = spt[i].split("=");
        result.param[st[0]] = st[1];
      }
    } else {
      result.path = path;
    }
    return result;
  }
}
