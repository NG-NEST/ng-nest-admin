import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutesModule } from './users-routes.module';
import { UsersComponent } from './users.component';
import { UserOperateComponent } from './user-operate/user-operate.component';
import { ShareModule } from 'src/share/share.module';
import { AdToolModule } from 'src/share/tool/tool.module';
import { UsersService } from './users.service';
import { XTableModule } from '@ng-nest/ui/table';
import { XInnerModule } from '@ng-nest/ui/inner';
import { XFormModule } from '@ng-nest/ui/form';
import { XButtonModule } from '@ng-nest/ui/button';
import { OrganizationService } from '../organization/organization.service';
import { XTreeModule } from '@ng-nest/ui/tree';

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    XButtonModule,
    XInnerModule,
    XTableModule,
    XFormModule,
    XTreeModule,
    AdToolModule,
    UsersRoutesModule
  ],
  declarations: [UsersComponent, UserOperateComponent],
  exports: [UsersComponent, UserOperateComponent],
  providers: [UsersService, OrganizationService]
})
export class UsersModule {}
