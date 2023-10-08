import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import { RoleRoutingModule } from './role-routing.module';
import { XTableModule } from '@ng-nest/ui/table';
import { XButtonModule } from '@ng-nest/ui/button';
import { XDialogModule } from '@ng-nest/ui/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XInputModule } from '@ng-nest/ui/input';

@NgModule({
  declarations: [RoleComponent],
  imports: [CommonModule, RoleRoutingModule, FormsModule, ReactiveFormsModule, XTableModule, XButtonModule, XDialogModule, XInputModule]
})
export class RoleModule {}
