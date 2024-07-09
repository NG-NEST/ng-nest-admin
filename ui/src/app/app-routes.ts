import { Routes } from '@angular/router';
import { AppCanActivate } from '@ui/core';

export const LayoutRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layout/index/index-routing.module').then((x) => x.IndexRoutes),
    canActivate: [AppCanActivate]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login-routing.module').then((x) => x.LoginRoutes),
    data: {
      login: true
    },
    canActivate: [AppCanActivate]
  }
];

export const AppRoutes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  {
    path: 'overview',
    loadChildren: () =>
      import('./pages/overview/overview-routing.module').then((x) => x.OverviewRoutes)
  },
  {
    path: 'user',
    loadChildren: () => import('./pages/user/user-routing.module').then((x) => x.UserRoutes)
  },
  {
    path: 'role',
    loadChildren: () => import('./pages/role/role-routing.module').then((x) => x.RoleRoutes)
  },
  {
    path: 'subject',
    loadChildren: () =>
      import('./pages/subject/subject-routing.module').then((x) => x.SubjectRoutes)
  },
  {
    path: 'aigc',
    loadChildren: () => import('./pages/aigc/aigc-routing.module').then((x) => x.AigcRoutes)
  }
];
