import { XMenuNode } from '@ng-nest/ui/menu';

export const AppMenus: XMenuNode[] = [
  { id: 1, label: '总览', icon: 'fto-home', routerLink: './overview' },
  { id: 2, label: '系统管理', icon: 'fto-settings' },
  { id: 3, pid: 2, label: '用户管理', icon: 'fto-user', routerLink: './user' },
  { id: 4, pid: 2, label: '角色管理', icon: 'fto-users', routerLink: './role' },
  { id: 5, pid: 2, label: '权限管理', icon: 'fto-list', routerLink: './subject' }
];
