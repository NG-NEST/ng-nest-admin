import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { IndexService, Menu } from "../../index.service";
import { ReuseStrategyService } from "../../../../services/reuse-strategy.service";
import * as _ from "lodash";
import { environment } from "src/environments/environment";

@Component({
  selector: "[app-sider-node]",
  templateUrl: "./sider-node.component.html",
  inputs: ["option", "level"],
  encapsulation: ViewEncapsulation.None
})
export class SiderNodeComponent implements OnInit {
  // 输入-菜单数据
  option: any = {};

  // 输入-当前层级
  level: number;

  // 输出-点击节点
  // nodeEmit = new EventEmitter<object>();

  // 子节点
  child = [];

  constructor(public indexService: IndexService) {}

  ngOnInit() {
    this.level = this.level + 1;
    this.child = this.indexService.menus.filter(
      x => x.parentId === this.option.id
    );
  }

  /**
   * 节点展开
   *
   * @param {Event} event
   * @param {any} option
   * @memberof SiderNodeComponent
   */
  toggle(event: Event, option) {
    event.stopPropagation();
    if (this.child.length > 0) option.childrenShow = !option.childrenShow;
  }

  sider(option) {
    let tab = _.find(
      this.indexService.session.tabsPage,
      (x: Menu) => x.router == option.router
    );
    if (tab && tab.subPage) {
      ReuseStrategyService.deleteRouteSnapshot(
        `/${environment.layout}/${option.router}`
      );
    }
  }
}
