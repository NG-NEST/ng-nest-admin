import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { XFormComponent, XControl } from '@ng-nest/ui/form';
import { SettingService } from 'src/services/setting.service';
import { UsersService } from '../users.service';
import { NavService } from 'src/services/nav.service';

@Component({
  selector: 'app-user-operate',
  templateUrl: './user-operate.component.html'
})
export class UserOperateComponent implements OnInit {
  config = {
    labelWidth: '6rem',
  };
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
    { control: 'input', id: 'roles', label: '角色', required: true },
    { control: 'input', id: 'organization', label: '组织机构', required: true },
    { control: 'input', id: 'email', label: '邮箱' },
    { control: 'input', id: 'phone', label: '电话' }
  ];

  @ViewChild('form') form: XFormComponent;

  constructor(private service: UsersService, private setting: SettingService, private cdr: ChangeDetectorRef, private nav: NavService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  cancel() {
    this.nav.back();
  }

  confirm() {
    this.service.post(Object.assign({ id: this.setting.guid() }, this.form.formGroup.value)).subscribe((x) => {
      this.nav.back(true);
    });
  }
}
