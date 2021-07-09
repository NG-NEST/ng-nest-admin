import { Component } from '@angular/core';
import { ModuleService } from './module.service';
import { Router, ActivatedRoute } from '@angular/router';
import { XMessageBoxService } from '@ng-nest/ui/message-box';
import { XMessageService } from '@ng-nest/ui/message';
import { IndexService } from 'src/layout/index/index.service';
import { PageBase } from 'src/share/base/base-page';
import { XTableColumn } from '@ng-nest/ui/table';

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

  constructor(
    public service: ModuleService,
    public indexService: IndexService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private message: XMessageService,
    private msgBox: XMessageBoxService
  ) {
    super(indexService);
  }

  action(type: string) {
    switch (type) {
      case 'add':
        break;
    }
  }
}
