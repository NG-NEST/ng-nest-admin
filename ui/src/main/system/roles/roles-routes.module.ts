import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesComponent } from './roles.component';
import { RoleDetailComponent } from './role-detail/role-detail.component';

const routes: Routes = [
  { path: '', component: RolesComponent },
  { path: ':type', component: RoleDetailComponent },
  { path: ':type/:id', component: RoleDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutesModule {}
