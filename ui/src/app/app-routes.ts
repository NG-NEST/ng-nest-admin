import { Routes } from '@angular/router';
import { AppCanActivate, AppCanLoad } from '@ui/core';

export const LayoutRoutes: Routes = [
  {
    path: 'xxx',
    loadChildren: () => import('./pages/json/json-routing.module').then((x) => x.JsonRoutes)
  },
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
    data: {
      permission: 'overview-view'
    },
    loadChildren: () =>
      import('./pages/overview/overview-routing.module').then((x) => x.OverviewRoutes),
    canActivate: [AppCanLoad]
  },
  {
    path: 'user',
    data: {
      permission: 'user-view'
    },
    loadChildren: () => import('./pages/user/user-routing.module').then((x) => x.UserRoutes),
    canActivate: [AppCanLoad]
  },
  {
    path: 'role',
    data: {
      permission: 'role-view'
    },
    loadChildren: () => import('./pages/role/role-routing.module').then((x) => x.RoleRoutes),
    canActivate: [AppCanLoad]
  },
  {
    path: 'resource',
    data: {
      permission: 'resource-view'
    },
    loadChildren: () =>
      import('./pages/subject/subject-routing.module').then((x) => x.SubjectRoutes),
    canActivate: [AppCanLoad]
  },
  {
    path: 'aigc',
    data: {
      permission: 'aigc-view'
    },
    loadChildren: () => import('./pages/aigc/aigc-routing.module').then((x) => x.AigcRoutes),
    canActivate: [AppCanLoad]
  },
  {
    path: 'code-generate',
    data: {
      permission: 'code-generate-view'
    },
    loadChildren: () =>
      import('./pages/code-generate/code-generate-routing.module').then(
        (x) => x.CodeGenerateRoutes
      ),
    canActivate: [AppCanLoad]
  },
  {
    path: 'schema',
    data: {
      permission: 'schema-view'
    },
    loadChildren: () => import('./pages/schema/schema-routing.module').then((x) => x.SchemaRoutes),
    canActivate: [AppCanLoad]
  },
  {
    path: 'cache',
    data: {
      permission: 'cache-view'
    },
    loadChildren: () => import('./pages/cache/cache-routing.module').then((x) => x.CacheRoutes),
    canActivate: [AppCanLoad]
  }
];
