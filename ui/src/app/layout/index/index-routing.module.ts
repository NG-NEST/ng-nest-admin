import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index.component';
import { AppRoutes } from 'src/app/app-routes';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: AppRoutes
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule {}
