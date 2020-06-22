import { Component } from '@angular/core';
import { XTableColumn } from '@ng-nest/ui/table';
import { UsersService } from './users.service';
import { Router, ActivatedRoute } from '@angular/router';

/**
 * 用户管理
 *
 * @export
 * @class UsersComponent
 */
@Component({
  selector: 'app-users',
  templateUrl: 'users.component.html'
})
export class UsersComponent {
  data = (index: number, size: number, query: any) =>
    this.service.getList(index, size, query).pipe((x: any) => {
      return x;
    });
  columns: XTableColumn[] = [
    { id: 'index', label: '序号', width: 100, left: 0, type: 'index' },
    { id: 'account', label: '用户', width: 120, left: 100, search: true, sort: true },
    { id: 'name', label: '姓名', width: 100, left: 220 },
    { id: 'organization', label: '组织机构', width: 100 },
    { id: 'email', label: '邮箱', flex: 1 },
    { id: 'phone', label: '电话', flex: 1 },
    { id: 'description', label: '备注', flex: 1 }
  ];

  constructor(public service: UsersService, private router: Router, private activatedRoute: ActivatedRoute) {}

  action(type) {
    switch (type) {
      case 'add':
        this.router.navigate([`./${type}`], { relativeTo: this.activatedRoute });
        break;
    }
  }
}
