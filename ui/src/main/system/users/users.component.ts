import { Component, ViewEncapsulation } from '@angular/core';
import * as _ from 'lodash';
import { XTableColumn, XTableAction } from '@ng-nest/ui/table';
import { UsersService, User } from './users.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Query } from 'src/services/repository.service';
import { XData } from '@ng-nest/ui/core';

/**
 * 用户管理
 *
 * @export
 * @class UsersComponent
 */
@Component({
  selector: 'app-users',
  templateUrl: 'users.component.html',
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent {
  actions: XTableAction[] = [
    { label: '新增', type: 'primary', icon: 'fto-plus' },
    { label: '导出', icon: 'fto-download' },
    { label: '批量操作', icon: 'fto-list' },
    {
      icon: 'fto-menu',
      title: '列表视图',
      actionLayoutType: 'top-right-icon'
    },
    {
      icon: 'fto-disc',
      title: '组织视图',
      actionLayoutType: 'top-right-icon'
    },
    {
      icon: 'fto-user',
      title: '角色视图',
      actionLayoutType: 'top-right-icon'
    },
    {
      icon: 'fto-play',
      title: '播放',
      actionLayoutType: 'row-icon'
    },
    {
      icon: 'fto-plus-square',
      title: '添加到',
      actionLayoutType: 'row-icon'
    },
    {
      icon: 'fto-download',
      title: '下载',
      actionLayoutType: 'row-icon'
    },
    {
      icon: 'fto-more-vertical',
      title: '更多操作',
      actionLayoutType: 'row-icon'
    }
  ];
  columns: XTableColumn[] = [
    { id: 'account', label: '用户', flex: 2 },
    { id: 'name', label: '姓名', flex: 1 },
    { id: 'email', label: '邮箱', flex: 1 },
    { id: 'phone', label: '电话', flex: 1 }
  ];
  constructor(public usersService: UsersService) {}

  actionClick(action: XTableAction) {
    console.log(action);
  }
}
