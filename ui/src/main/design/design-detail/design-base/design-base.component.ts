import { Component, Input, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Module, ModuleService } from '../../module.service';
import { IndexService } from 'src/layout/index/index.service';
import { PageBase } from 'src/share/base/base-page';
import { XIsChange } from '@ng-nest/ui/core';

@Component({
  selector: 'app-design-base',
  templateUrl: 'design-base.component.html',
  encapsulation: ViewEncapsulation.None
})
export class DesignDetailComponent extends PageBase {
  @Input() detail!: Module;
  constructor(public service: ModuleService, public indexService: IndexService) {
    super(indexService);
  }

  ngOnChanges(simple: SimpleChanges) {
    XIsChange(simple.detail) && this.getData();
  }

  getData() {}
}
