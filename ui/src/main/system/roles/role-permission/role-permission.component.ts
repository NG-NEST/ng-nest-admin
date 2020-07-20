import { Component, ViewChild, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { XFormRow } from '@ng-nest/ui/form';
import { FormGroup } from '@angular/forms';
import { XMessageService } from '@ng-nest/ui/message';
import { guid, XQuery } from '@ng-nest/ui/core';
import { XTreeAction, XTreeComponent } from '@ng-nest/ui/tree';
import { XMessageBoxService, XMessageBoxAction } from '@ng-nest/ui/message-box';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Menu, MenusService, ActionsService, Action } from '../../menus/menus.service';
import { XTableColumn, XTableComponent, XTableRow } from '@ng-nest/ui/table';
import { NavService } from 'src/services/nav.service';
import { RolesService } from '../roles.service';

@Component({
  selector: 'app-role-permission',
  templateUrl: 'role-permission.component.html'
})
export class RolePermissionComponent implements OnInit {
  @ViewChild('treeCom') treeCom: XTreeComponent;
  @ViewChild('tableCom') tableCom: XTableComponent;
  get disabled() {
    return typeof this.selected === 'undefined';
  }

  id: string | null;
  type = 'info';
  manual = false;
  selected: Menu;
  activatedId: string;
  activatedTemp: Action[] = [];
  checkedRow: { [prop: string]: any[] } = {};
  index = 1;
  query: XQuery = { filter: [], sort: [{ field: 'sort', value: 'asc' }] };
  treeLoading = true;

  treeData = () =>
    this.menus
      .getList(1, Number.MAX_SAFE_INTEGER, {
        sort: [
          { field: 'pid', value: 'asc' },
          { field: 'sort', value: 'asc' }
        ]
      })
      .pipe(
        tap(() => (this.treeLoading = false)),
        map((x) => x.list)
      );

  tableData = (index: number, size: number, query: any) =>
    this.actions.getList(index, size, query).pipe((x: any) => {
      return x;
    });

  columns: XTableColumn[] = [
    { id: 'checked', label: '选择', rowChecked: true, type: 'checkbox', width: 60 },
    { id: 'index', label: '序号', width: 80, type: 'index' },
    { id: 'name', label: '名称', flex: 1, sort: true },
    { id: 'code', label: '编码', flex: 1, sort: true },
    { id: 'icon', label: '图标', flex: 1 },
    { id: 'sort', label: '顺序', flex: 1, sort: true }
  ];

  constructor(
    private roles: RolesService,
    private menus: MenusService,
    private actions: ActionsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private message: XMessageService,
    private msgBox: XMessageBoxService,
    private nav: NavService
  ) {
    this.activatedRoute.paramMap.subscribe((x: ParamMap) => {
      this.id = x.get('id');
    });
  }

  ngOnInit() {}

  action(type: string, node: Menu | XTableRow) {
    switch (type) {
      case 'actions':
        this.roles.getActions(this.id as string, this.selected?.id).subscribe((x: Action[]) => {
          this.checkedRow = { checked: x.map((y) => y.id) };
          this.activatedTemp = x;
        });
        break;
      case 'menu-actions':
        this.type = type;
        this.selected = node;
        let filter = { field: 'menuId', value: node.id, operation: '=' } as any;
        if (!this.query.filter || this.query.filter.length == 0) {
          this.query.filter = [filter];
        } else {
          let flt = this.query.filter.find((x) => x.field === 'menuId');
          if (flt) flt.value = filter.value;
          else this.query.filter = [...this.query.filter, filter];
        }
        if (!this.manual) {
          this.manual = true;
        }
        this.action('actions', node);
        break;
      case 'save':
        this.roles.putActions(this.id as string, this.selected?.id, this.activatedTemp).subscribe((x) => {
          this.message.success('保存成功！');
        });
        break;
      case 'cancel':
        this.nav.back();
        break;
      case 'activated-row-change':
        if (node.checked) {
          this.activatedTemp = [...this.activatedTemp, node];
        } else {
          this.activatedTemp.splice(
            (this.activatedTemp as Array<any>).findIndex((x) => x.id === node.id),
            1
          );
        }
        break;
    }
  }
}
