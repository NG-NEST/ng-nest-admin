import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesComponent } from './roles.component';
import { RoleDetailComponent } from './role-detail/role-detail.component';
import { RolePermissionComponent } from './role-permission/role-permission.component';

const routes: Routes = [
  { path: '', component: RolesComponent },
  { path: 'permission/:id', component: RolePermissionComponent },
  { path: ':type', component: RoleDetailComponent },
  { path: ':type/:id', component: RoleDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutesModule {}
