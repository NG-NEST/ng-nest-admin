import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { XTableModule } from '@ng-nest/ui/table';

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, UserRoutingModule, XTableModule]
})
export class UserModule {}
