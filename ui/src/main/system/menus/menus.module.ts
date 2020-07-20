import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenusRoutesModule } from './menus-routes.module';
import { MenusComponent } from './menus.component';
import { MenuActionsComponent } from './menu-actions/menu-actions.component';
import { ActionDetailComponent } from './action-detail/action-detail.component';
import { ShareModule } from 'src/share/share.module';
import { AdToolModule } from 'src/share/tool/tool.module';
import { AdAdaptionModule } from 'src/share/adaption/adaption.module';
import { XButtonModule } from '@ng-nest/ui/button';
import { NgNestModule } from 'src/share/ng-nest.module';

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    XButtonModule,
    NgNestModule,
    AdToolModule,
    AdAdaptionModule,
    MenusRoutesModule
  ],
  declarations: [MenusComponent, MenuActionsComponent, ActionDetailComponent]
})
export class MenusModule {}
