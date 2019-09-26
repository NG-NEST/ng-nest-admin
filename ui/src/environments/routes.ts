import { Routes } from "@angular/router";
import { environment } from "./environment";
import { AuthGuard } from "../services/auth-guard";

// 公共路由
export const shareRoutes: Routes = [
  // 没有权限的显示模块
  {
    path: "no-auth",
    loadChildren: () =>
      import("../main/no-auth/no-auth.module").then(x => x.NoAuthModule)
  },
  // 错误的路由或不存在的路由指向的模块
  {
    path: "**",
    loadChildren: () =>
      import("../main/exception/404.module").then(x => x.Exception404Module)
  }
];

// 顶级路由，指向框架页
export const mainRoutes: Routes = [
  // 如果路由为空就指向 index
  { path: "", redirectTo: environment.layout, pathMatch: "full" },
  // 登录页
  {
    path: "login",
    loadChildren: () =>
      import("../main/login/login.module").then(x => x.LoginModule)
  },
  // index
  {
    path: "index",
    loadChildren: () =>
      import("../layout/index/index.module").then(x => x.IndexModule),
    canActivateChild: [AuthGuard],
    canLoad: [AuthGuard]
  },

  ...shareRoutes
];

// 框架页中对应的路由，指向具体的页面，框架页面中的路由都会带上顶级路由 index 如：/index/workplace
export const layoutRoutes: Routes = [
  // 如果路由为空就指向配置的默认首页
  { path: "", redirectTo: environment.defaultPage, pathMatch: "full" },
  // 仪表盘
  {
    path: "dashboard",
    loadChildren: () =>
      import("../main/dashboard/dashboard.module").then(x => x.DashboardModule),
    canLoad: [AuthGuard]
  },

  // 示例功能
  // { path: 'examples', loadChildren: 'src/main/examples/example.module#ExampleModule', canLoad: [AuthGuard] },
  // // 工作型首页
  // { path: 'workplace', loadChildren: 'src/main/dashboard/workplace/workplace.module#WorkplaceModule', canLoad: [AuthGuard] },
  // // 数据型首页
  // { path: 'analysis', loadChildren: 'src/main/dashboard/analysis/analysis.module#AnalysisModule' },
  // // 账号管理
  // { path: 'account', loadChildren: 'src/main/system/account/account.module#AccountModule', canLoad: [AuthGuard] },
  // // 角色管理
  // { path: 'role', loadChildren: 'src/main/system/role/role.module#RoleModule', canLoad: [AuthGuard] },
  // // 菜单管理
  // { path: 'menu', loadChildren: 'src/main/system/menu/menu.module#MenuModule', canLoad: [AuthGuard] },
  // // 组织管理
  // { path: 'organization', loadChildren: 'src/main/system/organization/organization.module#OrganizationModule', canLoad: [AuthGuard] },
  // // 模块设计
  // { path: 'module', loadChildren: 'src/main/module/module.module#ModuleModule', canLoad: [AuthGuard] },

  ...shareRoutes
];
