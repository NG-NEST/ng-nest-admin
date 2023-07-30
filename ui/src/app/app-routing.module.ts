import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppCanActivate } from '@ui/core';

const routes: Routes = [
  {
    path: 'index',
    loadChildren: () => import('./layout/index/index.module').then((x) => x.IndexModule),
    canActivateChild: [AppCanActivate],
    canLoad: [AppCanActivate]
  },

  { path: '', redirectTo: 'index', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
