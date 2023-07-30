import { Routes } from '@angular/router';
import { environment } from './environment';
import { AuthGuard } from '../services/auth-guard';

// 公共路由
export const shareRoutes: Routes = [
  // 没有权限的显示模块
  {
    path: 'no-auth',
    loadChildren: () => import('../main/no-auth/no-auth.module').then((x) => x.NoAuthModule)
  },
  // 错误的路由或不存在的路由指向的模块
  {
    path: '**',
    loadChildren: () => import('../main/exception/404.module').then((x) => x.Exception404Module)
  }
];

// 顶级路由，指向框架页
export const mainRoutes: Routes = [
  // 登录页
  {
    path: 'login',
    loadChildren: () => import('../main/login/login.module').then((x) => x.LoginModule)
  },
  // index
  {
    path: 'index',
    loadChildren: () => import('../layout/index/index.module').then((x) => x.IndexModule),
    canActivateChild: [AuthGuard],
    canLoad: [AuthGuard]
  },

  // 如果路由为空就指向 index
  { path: '', redirectTo: environment.layout, pathMatch: 'full' },

  ...shareRoutes
];

// 框架页中对应的路由，指向具体的页面，框架页面中的路由都会带上顶级路由 index 如：/index/workplace
export const layoutRoutes: Routes = [
  // 首页
  {
    path: 'home',
    loadChildren: () => import('../main/home/home.module').then((x) => x.HomeModule),
    canLoad: [AuthGuard],
    data: {
      title: 'home'
    }
  },
  // 仪表盘
  {
    path: 'dashboard',
    loadChildren: () => import('../main/dashboard/dashboard.module').then((x) => x.DashboardModule),
    canLoad: [AuthGuard],
    data: {
      title: 'dashboard'
    }
  },
  // 用户管理
  {
    path: 'users',
    loadChildren: () => import('../main/system/users/users.module').then((x) => x.UsersModule),
    canLoad: [AuthGuard],
    data: {
      title: 'users'
    }
  },
  // 角色管理
  {
    path: 'roles',
    loadChildren: () => import('../main/system/roles/roles.module').then((x) => x.RolesModule),
    canLoad: [AuthGuard],
    data: {
      shouldReuse: true
    }
  },
  // 组织管理
  {
    path: 'organization',
    loadChildren: () => import('../main/system/organization/organization.module').then((x) => x.OrganizationModule),
    canLoad: [AuthGuard],
    data: {
      shouldReuse: true
    }
  },
  // 菜单管理
  {
    path: 'menus',
    loadChildren: () => import('../main/system/menus/menus.module').then((x) => x.MenusModule),
    canLoad: [AuthGuard],
    data: {
      shouldReuse: true
    }
  },
  // 模块设计
  {
    path: 'design',
    loadChildren: () => import('../main/design/design.module').then((x) => x.DesignModule),
    canLoad: [AuthGuard],
    data: {
      shouldReuse: true
    }
  },

  // 如果路由为空就指向配置的默认首页
  { path: '', redirectTo: environment.defaultPage, pathMatch: 'full' },

  ...shareRoutes
];
