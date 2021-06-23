import { Component, ViewChild } from '@angular/core';
import { XTableColumn, XTableComponent } from '@ng-nest/ui/table';
import { ModuleDesignService } from './module-design.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { XQuery } from '@ng-nest/ui/core';
import { XMessageBoxService, XMessageBoxAction } from '@ng-nest/ui/message-box';
import { XMessageService } from '@ng-nest/ui/message';
import { IndexService } from 'src/layout/index/index.service';
import { PageBase } from 'src/share/base/base-page';

@Component({
  selector: 'app-module-design',
  templateUrl: 'module-design.component.html'
})
export class ModuleDesignComponent extends PageBase {
  

  @ViewChild('tableCom') tableCom!: XTableComponent;

  constructor(
    public service: ModuleDesignService,
    public indexService: IndexService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private message: XMessageService,
    private msgBox: XMessageBoxService
  ) {
    super(indexService);
  }

  action(type: string, item?: any) {
    switch (type) {
      case 'add':
        // let param = {};
        // if (this.selected) {
        //   param = { selectedId: this.selected?.id, selectedLabel: this.selected?.label };
        // }
        // this.router.navigate([`./${type}`, param], { relativeTo: this.activatedRoute });
        break;
      case 'info':
        this.router.navigate([`./${type}/${item.id}`], { relativeTo: this.activatedRoute });
        break;
      case 'edit':
        this.router.navigate([`./${type}/${item.id}`], { relativeTo: this.activatedRoute });
        break;
      case 'delete':
        // this.msgBox.confirm({
        //   title: '提示',
        //   content: `此操作将永久删除此条数据：${item.account}，是否继续？`,
        //   type: 'warning',
        //   callback: (action: XMessageBoxAction) => {
        //     action === 'confirm' &&
        //       this.service.delete(item.id).subscribe((x) => {
        //         this.tableCom.change(this.index);
        //         this.message.success('删除成功！');
        //       });
        //   }
        // });
        break;
      case 'tree-info':
        // this.selected = item;
        // let filter = { field: 'id', value: item.id, operation: '=', relation: 'organizations' } as any;
        // if (!this.query.filter || this.query.filter.length == 0) {
        //   this.query.filter = [filter];
        // } else {
        //   let flt = this.query.filter.find((x) => x.field === 'id' && x.relation === 'organizations');
        //   if (flt) flt.value = filter.value;
        //   else this.query.filter = [...this.query.filter, filter];
        // }
        // this.tableCom.change(1);
        break;
    }
  }
}
