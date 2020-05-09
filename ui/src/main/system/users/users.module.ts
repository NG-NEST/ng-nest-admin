import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutesModule } from './users-routes.module';
import { UsersComponent } from './users.component';
import { ShareModule } from '../../../share/share.module';
import { UsersService } from './users.service';
import { XTableModule } from '@ng-nest/ui/table';
import { XInnerModule } from '@ng-nest/ui/inner';

@NgModule({
  imports: [CommonModule, ShareModule, XInnerModule, XTableModule, UsersRoutesModule],
  declarations: [UsersComponent],
  exports: [UsersComponent],
  providers: [UsersService]
})
export class UsersModule {}
