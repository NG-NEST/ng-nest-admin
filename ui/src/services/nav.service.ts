import { ReuseStrategyService } from './reuse-strategy.service';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NavService {
  clearTo: boolean = false;

  history: NavigationEnd[] = [];

  first!: NavigationEnd;

  last!: NavigationEnd;

  now!: NavigationEnd;

  disabledBack: boolean = true;

  disabledForward: boolean = true;

  subscriptions: Subscription[] = [];

  constructor(private router: Router, private location: Location) {}

  init() {
    if (this.subscriptions.length > 0) {
      this.destroy();
    } else {
      this.subscriptions = [
        this.router.events.pipe(filter((x) => x instanceof NavigationStart)).subscribe((x) => {
          let nav = x as NavigationStart;
          if (this.clearTo) {
            ReuseStrategyService.deleteRouteSnapshot(nav.url);
            this.clearTo = false;
          }
        }),
        this.router.events.pipe(filter((x) => x instanceof NavigationEnd)).subscribe((x) => {
          let nav = x as NavigationEnd;
          if (nav.url === nav.urlAfterRedirects) {
            this.history.unshift(nav);
            this.first = _.first(this.history) as NavigationEnd;
            this.last = _.last(this.history) as NavigationEnd;
            this.now = nav;
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
    this.clearTo = clearTo as boolean;
    let first = _.first(this.history) as NavigationEnd;
    let urlSplit = _.split(first.url, '/');
    if (urlSplit.length >= 3) {
      let url = _.join(_.take(urlSplit, 3), '/');
      let his = _.find(
        this.history,
        (x: NavigationEnd) => x.id !== first.id && x.url.indexOf(url) === 0 && x.url !== first.url
      ) as NavigationEnd;
      if (his) {
        this.router.navigateByUrl(his.url).then(() => {
          _.remove(this.history, (x) => x.id > his.id);
        });
      } else {
        const i = urlSplit.length === 5 ? 2 : 1;
        let url = _.join(_.take(urlSplit, urlSplit.length - i), '/');
        this.backTo(url, first.url);
      }
      return false;
    }
    window.history.back();
    return true;
  }

  backTo(url: string, nowUrl: string) {
    this.router.navigateByUrl(url).then(() => {
      const fst = _.first(this.history) as NavigationEnd;
      if (fst.urlAfterRedirects === nowUrl) {
        let urlSplit = _.split(url, '/');
        this.backTo(_.join(_.take(urlSplit, urlSplit.length - 1), '/'), nowUrl);
      }
    });
  }

  removeThis() {
    let url = this.location.path();
    ReuseStrategyService.deleteRouteSnapshot(url);
  }

  getUrl(path: string): { path: string; param: any } {
    let result: { path: string; param: { [prop: string]: any } } = {
      path: '',
      param: {}
    };
    if (path.indexOf(';') > -1) {
      let spt = path.split(';');
      result.path = spt[0];
      for (let i = 1; i < spt.length; i++) {
        let st = spt[i].split('=');
        result.param[st[0]] = st[1];
      }
    } else {
      result.path = path;
    }
    return result;
  }
}
