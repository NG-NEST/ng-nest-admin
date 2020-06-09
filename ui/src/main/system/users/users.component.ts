import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { XTableColumn, XTableAction } from '@ng-nest/ui/table';
import { UsersService } from './users.service';
import { XFormRow, XInputControl, XFormComponent, XControl } from '@ng-nest/ui/form';
import { SettingService } from 'src/services/setting.service';

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
    { id: 'index', label: '序号', width: 100, left: 0, type: 'index' },
    { id: 'account', label: '用户', width: 120, left: 100, search: true, sort: true },
    { id: 'name', label: '姓名', width: 100, left: 220 },
    { id: 'organization', label: '组织机构', width: 100 },
    { id: 'email', label: '邮箱', width: 200 },
    { id: 'phone', label: '电话', width: 150 },
    { id: 'description', label: '备注', flex: 1 }
  ];

  title = '';
  visible = false;

  @ViewChild('form', { static: false }) form: XFormComponent;
  controls: XControl[] = [
    {
      control: 'input',
      id: 'account',
      label: '用户',
      required: true,
      maxlength: 16,
      pattern: /^[A-Za-z0-9]{4,16}$/,
      message: '只能包括数字、字母的组合，长度为4-16位'
    },
    {
      control: 'input',
      id: 'password',
      label: '密码',
      type: 'password',
      required: true,
      maxlength: 16,
      pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z\\W]{6,18}$/,
      message: '密码中必须包含字母和数字，长度为6-16位'
    },
    { control: 'input', id: 'surePassword', label: '确认密码', type: 'password', required: true },
    { control: 'input', id: 'name', label: '姓名', required: true },
    { control: 'input', id: 'organization', label: '组织机构', required: true },
    { control: 'input', id: 'email', label: '邮箱' },
    { control: 'input', id: 'phone', label: '电话' }
  ];

  constructor(public service: UsersService, private setting: SettingService) {}

  actionClick(action: XTableAction) {
    this.title = action.label;
    switch (action.label) {
      case '新增':
        this.add();
        break;
    }
  }

  close() {
    this.visible = false;
  }

  add() {
    this.visible = true;
  }

  confirm() {
    // this.visible = false;
    // console.log(this.form.formGroup.value);
    this.service.post(Object.assign({ id: this.setting.guid() }, this.form.formGroup.value)).subscribe((x) => {
      console.log(x);
      this.visible = false;
    });
  }
}
