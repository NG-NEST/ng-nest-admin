import { Routes } from '@angular/router';
import { AppCanActivate } from '@ui/core';

export const LayoutRoutes: Routes = [
  {
    path: 'index',
    loadChildren: () => import('./layout/index/index-routing.module').then((x) => x.IndexRoutes),
    canActivateChild: [AppCanActivate],
    canLoad: [AppCanActivate]
  },

  { path: '', redirectTo: 'index', pathMatch: 'full' }
];

export const AppRoutes: Routes = [
  {
    path: 'overview',
    loadChildren: () => import('./pages/overview/overview-routing.module').then((x) => x.OverviewRoutes),
    canActivate: [AppCanActivate]
  },
  {
    path: 'user',
    loadChildren: () => import('./pages/user/user-routing.module').then((x) => x.UserRoutes),
    canActivate: [AppCanActivate]
  },
  {
    path: 'role',
    loadChildren: () => import('./pages/role/role-routing.module').then((x) => x.RoleRoutes),
    canActivate: [AppCanActivate]
  },

  { path: '', redirectTo: 'overview', pathMatch: 'full' }
];
