import { Component, ViewEncapsulation } from "@angular/core";
import * as _ from "lodash";
import { NmTableColumn, NmTableAction } from "ng-moon/table";
import { UsersService, User } from "./users.service";
import { Query } from "../../../services/repository.service";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

/**
 * 用户管理
 *
 * @export
 * @class UsersComponent
 */
@Component({
  selector: "app-users",
  templateUrl: "users.component.html",
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent {
  actions: NmTableAction[] = [
    { nmLabel: "新增", nmIcon: "fto-plus" },
    { nmLabel: "导出", nmIcon: "fto-download" },
    { nmLabel: "批量操作", nmIcon: "fto-list" },
    {
      nmIcon: "fto-menu",
      nmTitle: "列表视图",
      nmActionLayoutType: "top-right-icon"
    },
    {
      nmIcon: "fto-disc",
      nmTitle: "组织视图",
      nmActionLayoutType: "top-right-icon"
    },
    {
      nmIcon: "fto-user",
      nmTitle: "角色视图",
      nmActionLayoutType: "top-right-icon"
    },
    {
      nmIcon: "fto-play",
      nmTitle: "播放",
      nmActionLayoutType: "row-icon"
    },
    {
      nmIcon: "fto-plus-square",
      nmTitle: "添加到",
      nmActionLayoutType: "row-icon"
    },
    {
      nmIcon: "fto-download",
      nmTitle: "下载",
      nmActionLayoutType: "row-icon"
    },
    {
      nmIcon: "fto-more-vertical",
      nmTitle: "更多操作",
      nmActionLayoutType: "row-icon"
    }
  ];
  columns: NmTableColumn[] = [
    { nmKey: "user", nmLabel: "用户", nmFlex: 2 },
    { nmKey: "email", nmLabel: "邮箱", nmFlex: 1 },
    { nmKey: "phone", nmLabel: "电话", nmFlex: 1 }
  ];
  query: Query = {};
  index = 1;
  size = 10;
  total = 0;
  data: User[];

  constructor(private usersService: UsersService) {
    this.getList().subscribe();
  }

  getList(): Observable<User[]> {
    return this.usersService.getList(this.index, this.size, this.query).pipe(
      map(x => {
        this.total = x.total;
        this.data = _.map(x.list, y => {
          y.user = `${y.name} - ${y.account}`;
          return y;
        });
        return this.data;
      })
    );
  }

  indexChange(index: number) {
    this.index = index;
    this.getList().subscribe();
  }

  actionClick(action: NmTableAction) {
    console.log(action);
  }
}
