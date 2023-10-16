import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import { RoleRoutingModule } from './role-routing.module';
import { XTableModule } from '@ng-nest/ui/table';
import { XButtonModule } from '@ng-nest/ui/button';
import { XDialogModule } from '@ng-nest/ui/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XInputModule } from '@ng-nest/ui/input';
import { RoleDetailComponent } from './role-detail/role-detail.component';
import { XMessageModule } from '@ng-nest/ui/message';
import { XLinkModule } from '@ng-nest/ui/link';
import { XMessageBoxModule } from '@ng-nest/ui/message-box';
import { XLoadingModule } from '@ng-nest/ui/loading';

@NgModule({
  declarations: [RoleComponent, RoleDetailComponent],
  imports: [
    CommonModule,
    RoleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    XTableModule,
    XButtonModule,
    XDialogModule,
    XMessageModule,
    XInputModule,
    XLinkModule,
    XMessageBoxModule,
    XLoadingModule
  ]
})
export class RoleModule {}
