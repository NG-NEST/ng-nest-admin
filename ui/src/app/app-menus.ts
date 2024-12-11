import { XMenuNode } from '@ng-nest/ui/menu';

export const AppMenus: XMenuNode[] = [
  { id: 100, label: '总览', icon: 'fto-home', routerLink: './overview' },
  { id: 110, label: 'AIGC', icon: 'fto-send', routerLink: './aigc' },
  { id: 200, label: '系统管理', icon: 'fto-settings' },
  { id: 300, pid: 200, label: '用户管理', icon: 'fto-user', routerLink: './user' },
  { id: 400, pid: 200, label: '角色管理', icon: 'fto-users', routerLink: './role' },
  { id: 500, pid: 200, label: '资源管理', icon: 'fto-list', routerLink: './subject' }
];
