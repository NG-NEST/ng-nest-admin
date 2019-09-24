import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { IndexService, Menu } from "../index.service";
import { Router } from "@angular/router";
import * as _ from "lodash";
import { environment } from "src/environments/environment";
import { ReuseStrategyService } from "../../../services/reuse-strategy.service";

@Component({
  selector: "app-tabs",
  templateUrl: "./tabs.component.html",
  encapsulation: ViewEncapsulation.None
})
export class TabsComponent implements OnInit {
  constructor(public indexService: IndexService, private router: Router) {}

  ngOnInit() {}

  /**
   * tab点击事件
   *
   * @memberof TabsComponent
   */
  tab(tab: Menu) {
    if (tab && tab.router) {
      let page = tab.router;
      let subRoot = tab.subPage;
      let param = {};
      if (subRoot) {
        if (subRoot.indexOf(";") > -1) {
          let subs = subRoot.split(";");
          subs.forEach((x, i) => {
            if (i == 0) {
              subRoot = x;
              page += `/${subRoot}`;
            } else {
              let vals = x.split("=");
              param[vals[0]] = vals[1];
            }
          });
        } else {
          page += `/${subRoot}`;
        }
      }
      this.router.navigate([`/${environment.layout}/${page}`, param]);
    }
  }

  /**
   * tab关闭事件
   *
   * @memberof TabsComponent
   */
  close(tab: Menu) {
    let tabsPage = this.indexService.session.tabsPage;
    let deleteIndex = 0;

    // 清除标签页
    _.remove(tabsPage, (x, index) => {
      if (x.router === tab.router) deleteIndex = index;
      return x.router === tab.router;
    });
    ReuseStrategyService.deleteRouteSnapshot(
      `/${environment.layout}/${tab.router}`
    );
    this.indexService.session = { tabsPage: tabsPage };

    // 判断路由跳转
    if (tab.router === this.indexService.session.activatedPage) {
      let pushIndex = null;
      if (deleteIndex === 0 && tabsPage.length >= 1) {
        pushIndex = 0;
      }
      if (deleteIndex > 0 && tabsPage.length > deleteIndex) {
        pushIndex = deleteIndex;
      }
      if (deleteIndex > 0 && tabsPage.length <= deleteIndex) {
        pushIndex = deleteIndex - 1;
      }
      this.tab(tabsPage[pushIndex]);
    }
  }
}
