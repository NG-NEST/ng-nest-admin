import { Component, ViewChild } from '@angular/core';
import { XTableColumn, XTableComponent } from '@ng-nest/ui/table';
import { UsersService } from './users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { OrganizationService } from '../organization/organization.service';
import { XQuery } from '@ng-nest/ui/core';

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
  query: XQuery = { filter: [] };
  data = (index: number, size: number, query: any) =>
    this.service.getList(index, size, query).pipe((x: any) => {
      return x;
    });
  treeData = () => this.organization.getList(1, Number.MAX_SAFE_INTEGER).pipe(map((x) => x.list));
  columns: XTableColumn[] = [
    { id: 'index', label: '序号', width: 100, left: 0, type: 'index' },
    { id: 'account', label: '用户', width: 120, left: 100, search: true, sort: true },
    { id: 'name', label: '姓名', width: 100, left: 220 },
    { id: 'email', label: '邮箱', flex: 1 },
    { id: 'phone', label: '电话', flex: 1 },
    { id: 'description', label: '备注', flex: 1 }
  ];

  @ViewChild('tableCom') tableCom: XTableComponent;

  constructor(
    public service: UsersService,
    private organization: OrganizationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  action(type: string, $event?: any) {
    switch (type) {
      case 'add':
        this.router.navigate([`./${type}`], { relativeTo: this.activatedRoute });
        break;
      case 'tree-info':
        let filter = { field: 'organizationId', value: $event.id, operation: '=', relation: 'organizations' } as any;
        if (!this.query.filter || this.query.filter.length == 0) {
          this.query.filter = [filter];
        } else {
          let flt = this.query.filter.find((x) => x.field === 'organizationId');
          if (flt) flt = filter;
          else this.query.filter = [...this.query.filter, filter];
        }
        this.tableCom.change(1);
        break;
    }
  }
}
