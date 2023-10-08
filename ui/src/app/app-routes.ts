import { Routes } from '@angular/router';
import { AppCanActivate } from '@ui/core';

export const AppRoutes: Routes = [
  {
    path: 'overview',
    loadChildren: () => import('./pages/overview/overview.module').then((x) => x.OverviewModule),
    canActivate: [AppCanActivate]
  },
  {
    path: 'user',
    loadChildren: () => import('./pages/user/user.module').then((x) => x.UserModule),
    canActivate: [AppCanActivate]
  },
  {
    path: 'role',
    loadChildren: () => import('./pages/role/role.module').then((x) => x.RoleModule),
    canActivate: [AppCanActivate]
  },

  { path: '', redirectTo: 'overview', pathMatch: 'full' }
];
