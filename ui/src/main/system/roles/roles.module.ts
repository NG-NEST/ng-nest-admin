import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XTableModule } from '@ng-nest/ui/table';
import { XInnerModule } from '@ng-nest/ui/inner';
import { XFormModule } from '@ng-nest/ui/form';
import { XButtonModule } from '@ng-nest/ui/button';
import { XTreeModule } from '@ng-nest/ui/tree';
import { XLinkModule } from '@ng-nest/ui/link';
import { XIconModule } from '@ng-nest/ui/icon';
import { XMessageBoxModule } from '@ng-nest/ui/message-box';
import { XMessageModule } from '@ng-nest/ui/message';
import { RolesRoutesModule } from './roles-routes.module';
import { RolesComponent } from './roles.component';
import { RoleDetailComponent } from './role-detail/role-detail.component';
import { ShareModule } from 'src/share/share.module';
import { AdToolModule } from 'src/share/tool/tool.module';
import { AdAdaptionModule } from 'src/share/adaption/adaption.module';
import { RolePermissionComponent } from './role-permission/role-permission.component';

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    XButtonModule,
    XInnerModule,
    XTableModule,
    XFormModule,
    XTreeModule,
    XLinkModule,
    XIconModule,
    XMessageModule,
    XMessageBoxModule,
    AdToolModule,
    AdAdaptionModule,
    RolesRoutesModule
  ],
  declarations: [RolesComponent, RoleDetailComponent, RolePermissionComponent]
})
export class RolesModule {}
