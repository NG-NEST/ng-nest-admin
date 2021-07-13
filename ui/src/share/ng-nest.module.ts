import { NgModule } from '@angular/core';
import { XButtonModule } from '@ng-nest/ui/button';
import { XInnerModule } from '@ng-nest/ui/inner';
import { XTableModule } from '@ng-nest/ui/table';
import { XFormModule } from '@ng-nest/ui/form';
import { XTreeModule } from '@ng-nest/ui/tree';
import { XLinkModule } from '@ng-nest/ui/link';
import { XMessageModule } from '@ng-nest/ui/message';
import { XMessageBoxModule } from '@ng-nest/ui/message-box';
import { XLoadingModule } from '@ng-nest/ui/loading';
import { XIconModule } from '@ng-nest/ui/icon';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { XDocModule } from '@ng-nest/ui/doc';
import { XCardModule } from '@ng-nest/ui/card';
import { XStatisticModule } from '@ng-nest/ui/statistic';
import { XContainerModule } from '@ng-nest/ui/container';
import { XAvatarModule } from '@ng-nest/ui/avatar';
import { XTabsModule } from '@ng-nest/ui/tabs';

// 模块
const modules = [
  XButtonModule,
  XInnerModule,
  XContainerModule,
  XTableModule,
  XFormModule,
  XTreeModule,
  XLinkModule,
  XIconModule,
  XLayoutModule,
  XDocModule,
  XCardModule,
  XStatisticModule,
  XAvatarModule,
  XMessageModule,
  XMessageBoxModule,
  XLoadingModule,
  XTabsModule
];

/**
 * 使用的 ng-nest 模块
 */
@NgModule({
  imports: [...modules],
  exports: [...modules]
})
export class NgNestModule {}
