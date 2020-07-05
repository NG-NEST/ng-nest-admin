import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenusRoutesModule } from './menus-routes.module';
import { MenusComponent } from './menus.component';
import { MenuActionsComponent } from './menu-actions/menu-actions.component';
import { ShareModule } from 'src/share/share.module';
import { AdToolModule } from 'src/share/tool/tool.module';
import { AdAdaptionModule } from 'src/share/adaption/adaption.module';
import { MenusService, ActionsService } from './menus.service';
import { XInnerModule } from '@ng-nest/ui/inner';
import { XFormModule } from '@ng-nest/ui/form';
import { XButtonModule } from '@ng-nest/ui/button';
import { XTreeModule } from '@ng-nest/ui/tree';
import { XLinkModule } from '@ng-nest/ui/link';
import { XMessageModule } from '@ng-nest/ui/message';
import { XMessageBoxModule } from '@ng-nest/ui/message-box';
import { XTableModule } from '@ng-nest/ui/table';

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    XButtonModule,
    XInnerModule,
    XFormModule,
    XTreeModule,
    XTableModule,
    XLinkModule,
    XMessageModule,
    XMessageBoxModule,
    AdToolModule,
    AdAdaptionModule,
    MenusRoutesModule
  ],
  declarations: [MenusComponent, MenuActionsComponent],
  exports: [MenusComponent, MenuActionsComponent],
  providers: [MenusService, ActionsService]
})
export class MenusModule {}
