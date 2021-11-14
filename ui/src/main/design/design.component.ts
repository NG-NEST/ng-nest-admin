import { Component } from '@angular/core';
import { Module, ModuleService } from './module.service';
import { IndexService } from 'src/layout/index/index.service';
import { PageBase } from 'src/share/base/base-page';
import { XTableColumn, XTableRow } from '@ng-nest/ui/table';

@Component({
  selector: 'app-design',
  templateUrl: 'design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent extends PageBase {
  data = (index: number, size: number, query: any) =>
    this.service.getList(index, size, query).pipe((x: any) => {
      return x;
    });

  columns: XTableColumn[] = [{ id: 'name', label: '模块', flex: 1, sort: true }];

  activatedRow!: Module;

  constructor(public service: ModuleService, public override indexService: IndexService) {
    super(indexService);
  }

  action(type: string) {
    switch (type) {
      case 'add':
        break;
    }
  }

  activatedRowChange(row: XTableRow | Module) {
    this.activatedRow = row as Module;
  }
}
