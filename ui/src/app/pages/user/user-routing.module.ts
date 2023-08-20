import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { UsersResolver } from './user.resover';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    resolve: {
      users: UsersResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
