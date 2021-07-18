import { Component, Input, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Module, ModuleService } from '../module.service';
import { Router, ActivatedRoute } from '@angular/router';
import { XMessageBoxService } from '@ng-nest/ui/message-box';
import { XMessageService } from '@ng-nest/ui/message';
import { IndexService } from 'src/layout/index/index.service';
import { PageBase } from 'src/share/base/base-page';
import { XIsChange } from '@ng-nest/ui/core';

@Component({
  selector: 'app-design-detail',
  templateUrl: 'design-detail.component.html',
  encapsulation: ViewEncapsulation.None
})
export class DesignDetailComponent extends PageBase {
  @Input() detail!: Module;
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

  ngOnChanges(simple: SimpleChanges) {
    XIsChange(simple.detail) && this.getData();
  }

  getData() {}
}
