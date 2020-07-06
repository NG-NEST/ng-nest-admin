import { Component, ViewChild } from '@angular/core';
import { XTableColumn, XTableComponent } from '@ng-nest/ui/table';
import { RolesService } from './roles.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { OrganizationService, Organization } from '../organization/organization.service';
import { XQuery } from '@ng-nest/ui/core';
import { XMessageBoxService, XMessageBoxAction } from '@ng-nest/ui/message-box';
import { XMessageService } from '@ng-nest/ui/message';

@Component({
  selector: 'app-roles',
  templateUrl: 'roles.component.html'
})
export class RolesComponent {
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
    { id: 'actions', label: '操作', width: 120, left: 80 },
    { id: 'name', label: '角色名称', flex: 1, sort: true }
  ];

  @ViewChild('tableCom') tableCom: XTableComponent;

  constructor(
    public service: RolesService,
    private organization: OrganizationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private message: XMessageService,
    private msgBox: XMessageBoxService
  ) {}

  action(type: string, item?: any) {
    switch (type) {
      case 'add':
        let param = {};
        if (this.selected) {
          param = { selectedId: this.selected?.id, selectedLabel: this.selected?.label };
        }
        this.router.navigate([`./${type}`, param], { relativeTo: this.activatedRoute });
        break;
      case 'info':
        this.router.navigate([`./${type}/${item.id}`], { relativeTo: this.activatedRoute });
        break;
      case 'edit':
        this.router.navigate([`./${type}/${item.id}`], { relativeTo: this.activatedRoute });
        break;
      case 'delete':
        this.msgBox.confirm({
          title: '提示',
          content: `此操作将永久删除此条数据：${item.name}，是否继续？`,
          type: 'warning',
          callback: (action: XMessageBoxAction) => {
            action === 'confirm' &&
              this.service.delete(item.id).subscribe((x) => {
                this.tableCom.change(this.index);
                this.message.success('删除成功！');
              });
          }
        });
        break;
      case 'tree-info':
        this.selected = item;
        let filter = { field: 'organizationId', value: item.id, operation: '=' } as any;
        if (!this.query.filter || this.query.filter.length == 0) {
          this.query.filter = [filter];
        } else {
          let flt = this.query.filter.find((x) => x.field === 'organizationId');
          if (flt) flt.value = filter.value;
          else this.query.filter = [...this.query.filter, filter];
        }
        this.tableCom.change(1);
        break;
      case 'permission':
        this.router.navigate([`./permission/${item.id}`], { relativeTo: this.activatedRoute });
        break;
    }
  }
}
