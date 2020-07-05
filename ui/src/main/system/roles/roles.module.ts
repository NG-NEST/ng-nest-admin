import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesRoutesModule } from './roles-routes.module';
import { RolesComponent } from './roles.component';
import { RoleDetailComponent } from './role-detail/role-detail.component';
import { ShareModule } from 'src/share/share.module';
import { AdToolModule } from 'src/share/tool/tool.module';
import { AdAdaptionModule } from 'src/share/adaption/adaption.module';
import { RolesService } from './roles.service';
import { XTableModule } from '@ng-nest/ui/table';
import { XInnerModule } from '@ng-nest/ui/inner';
import { XFormModule } from '@ng-nest/ui/form';
import { XButtonModule } from '@ng-nest/ui/button';
import { OrganizationService } from '../organization/organization.service';
import { XTreeModule } from '@ng-nest/ui/tree';
import { XLinkModule } from '@ng-nest/ui/link';
import { XMessageBoxModule } from '@ng-nest/ui/message-box';
import { XMessageModule } from '@ng-nest/ui/message';

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
    XMessageModule,
    XMessageBoxModule,
    AdToolModule,
    AdAdaptionModule,
    RolesRoutesModule
  ],
  declarations: [RolesComponent, RoleDetailComponent],
  exports: [RolesComponent, RoleDetailComponent],
  providers: [RolesService, OrganizationService]
})
export class RolesModule {}
