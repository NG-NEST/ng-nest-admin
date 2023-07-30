import { Component, ChangeDetectionStrategy, OnInit, ViewChild } from '@angular/core';
import { XQuery } from '@ng-nest/ui/core';
import { ActionsService } from '../menus.service';
import { XTableColumn, XTableComponent } from '@ng-nest/ui/table';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { XMessageService } from '@ng-nest/ui/message';
import { XMessageBoxService, XMessageBoxAction } from '@ng-nest/ui/message-box';
import { NavService } from 'src/services/nav.service';

@Component({
  selector: 'app-menu-actions',
  templateUrl: './menu-actions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuActionsComponent implements OnInit {
  index = 1;
  query: XQuery = { filter: [], sort: [{ field: 'sort', value: 'asc' }] };
  menuId!: string;
  data = (index: number, size: number, query: any) =>
    this.service.getList(index, size, query).pipe((x: any) => {
      return x;
    });
  columns: XTableColumn[] = [
    { id: 'index', label: '序号', width: 80, type: 'index' },
    { id: 'actions', label: '操作', width: 100 },
    { id: 'name', label: '名称', flex: 1, sort: true },
    { id: 'code', label: '编码', flex: 1, sort: true },
    { id: 'icon', label: '图标', flex: 1 },
    { id: 'sort', label: '顺序', flex: 1, sort: true }
  ];

  @ViewChild('tableCom') tableCom!: XTableComponent;

  constructor(
    public service: ActionsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private message: XMessageService,
    private msgBox: XMessageBoxService,
    private nav: NavService
  ) {
    this.activatedRoute.paramMap.subscribe((x: ParamMap) => {
      this.menuId = x.get('menuId') as string;
      this.query.filter = [{ field: 'menuId', value: this.menuId as string, operation: '=' }];
    });
  }

  ngOnInit() {}

  action(type: string, item?: any) {
    switch (type) {
      case 'add':
        this.router.navigate([`./${type}`], { relativeTo: this.activatedRoute });
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
              this.service.delete(item.id).subscribe(() => {
                this.tableCom.change(this.index);
                this.message.success('删除成功！');
              });
          }
        });
        break;
      case 'cancel':
        this.nav.back();
        break;
    }
  }
}
