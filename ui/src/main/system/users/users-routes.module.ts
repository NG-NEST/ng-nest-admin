import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserOperateComponent } from './user-operate/user-operate.component';

const routes: Routes = [
  { path: '', component: UsersComponent },
  { path: ':type', component: UserOperateComponent },
  { path: ':type/:id', component: UserOperateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutesModule {}
