import {
  Component,
  OnInit,
  EventEmitter,
  ViewEncapsulation
} from "@angular/core";
import { IndexService } from "../index.service";
import * as _ from "lodash";

@Component({
  selector: "app-sider",
  templateUrl: "./sider.component.html",
  encapsulation: ViewEncapsulation.None
})
export class SiderComponent implements OnInit {
  // 输入参数-菜单数据
  option: any = _.filter(this.indexService.menus, x => x.parentId === null);

  // 输出参数-节点点击
  nodeEmit = new EventEmitter<object>();

  // 层级
  level: number = 0;

  constructor(private indexService: IndexService) {}

  ngOnInit() {}
}
