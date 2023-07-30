import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, UserRoutingModule]
})
export class UserModule {}
