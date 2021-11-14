import { Component, Input, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Module, ModuleService } from '../module.service';
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
  constructor(public service: ModuleService, public override indexService: IndexService) {
    super(indexService);
  }

  ngOnChanges(simples: SimpleChanges) {
    const { detail } = simples;
    XIsChange(detail) && this.getData();
  }

  getData() {}
}
