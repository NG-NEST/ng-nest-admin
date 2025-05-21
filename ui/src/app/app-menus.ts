import { XMenuNode } from '@ng-nest/ui/menu';

export const AppMenus: XMenuNode[] = [
  { id: 100, label: '总览', icon: 'fto-home', routerLink: './overview' },
  { id: 110, label: 'AIGC', icon: 'fto-send', routerLink: './aigc' },
  { id: 200, label: '系统管理', icon: 'fto-settings' },
  { id: 300, pid: 200, label: '用户管理', icon: 'fto-user', routerLink: './user' },
  { id: 400, pid: 200, label: '角色管理', icon: 'fto-users', routerLink: './role' },
  { id: 500, pid: 200, label: '资源管理', icon: 'fto-list', routerLink: './resource' },
  { id: 600, pid: 200, label: '代码生成', icon: 'fto-code', routerLink: './code-generate' },
  { id: 700, pid: 200, label: '数据模型', icon: 'admin:json', routerLink: './schema' }
];

if (typeof Worker !== 'undefined') {
  // Create a new
  const worker = new Worker(new URL('./app.worker', import.meta.url));
  worker.onmessage = ({ data }) => {
    console.log(`page got message: ${data}`);
  };
  worker.postMessage('hello');
} else {
  // Web Workers are not supported in this environment.
  // You should add a fallback so that your program still executes correctly.
}
