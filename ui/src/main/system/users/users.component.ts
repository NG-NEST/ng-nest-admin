import { Component, ViewChild } from '@angular/core';
import { XTableColumn, XTableComponent } from '@ng-nest/ui/table';
import { UsersService } from './users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { OrganizationService, Organization } from '../organization/organization.service';
import { XQuery } from '@ng-nest/ui/core';
import { XMessageBoxService, XMessageBoxAction } from '@ng-nest/ui/message-box';
import { XMessageService } from '@ng-nest/ui/message';

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
  index = 1;
  query: XQuery = { filter: [] };
  data = (index: number, size: number, query: any) =>
    this.service.getList(index, size, query).pipe((x: any) => {
      return x;
    });
  treeData = () => this.organization.getList(1, Number.MAX_SAFE_INTEGER).pipe(map((x) => x.list));
  selected: Organization;
  columns: XTableColumn[] = [
    { id: 'index', label: '序号', width: 80, left: 0, type: 'index' },
    { id: 'actions', label: '操作', width: 100 },
    { id: 'account', label: '用户', width: 100, left: 80, search: true, sort: true },
    { id: 'name', label: '姓名', width: 80, left: 180 },
    { id: 'email', label: '邮箱', flex: 1 },
    { id: 'phone', label: '电话', flex: 1 }
  ];

  @ViewChild('tableCom') tableCom: XTableComponent;

  constructor(
    public service: UsersService,
    private organization: OrganizationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private message: XMessageService,
    private msgBox: XMessageBoxService
  ) {}

  action(type: string, $event?: any) {
    switch (type) {
      case 'add':
        this.router.navigate([`./${type}`, { selectedId: this.selected?.id, selectedLabel: this.selected?.label }], {
          relativeTo: this.activatedRoute
        });
        break;
      case 'edit':
        this.router.navigate([`./${type}/${$event.id}`], { relativeTo: this.activatedRoute });
        break;
      case 'delete':
        this.msgBox.confirm({
          title: '提示',
          content: `此操作将永久删除此条数据：${$event.account}，是否继续？`,
          type: 'warning',
          callback: (action: XMessageBoxAction) => {
            action === 'confirm' &&
              this.service.delete($event.id).subscribe((x) => {
                this.tableCom.change(this.index);
                this.message.success('删除成功！');
              });
          }
        });
        break;
      case 'tree-info':
        this.selected = $event;
        let filter = { field: 'id', value: $event.id, operation: '=', relation: 'organizations' } as any;
        if (!this.query.filter || this.query.filter.length == 0) {
          this.query.filter = [filter];
        } else {
          let flt = this.query.filter.find((x) => x.field === 'id' && x.relation === 'organizations');
          if (flt) flt.value = filter.value;
          else this.query.filter = [...this.query.filter, filter];
        }
        this.tableCom.change(1);
        break;
    }
  }
}
