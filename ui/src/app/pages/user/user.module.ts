import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { XTableModule } from '@ng-nest/ui/table';
import { XButtonModule } from '@ng-nest/ui/button';
import { XDialogModule } from '@ng-nest/ui/dialog';
import { XMessageModule } from '@ng-nest/ui/message';
import { XLinkModule } from '@ng-nest/ui/link';
import { XInputModule } from '@ng-nest/ui/input';
import { XMessageBoxModule } from '@ng-nest/ui/message-box';
import { XLoadingModule } from '@ng-nest/ui/loading';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserComponent, UserDetailComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
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
export class UserModule {}
