import { XMenuNode } from '@ng-nest/ui/menu';

export const AppMenus: XMenuNode[] = [
  { id: 100, label: '总览', icon: 'fto-home', routerLink: './overview' },
  { id: 200, label: 'AIGC', icon: 'fto-send', routerLink: './aigc' },
  { id: 300, label: '领域数据', icon: 'fto-settings' },
  { id: 500, pid: 300, label: '数据定义', icon: 'admin:json', routerLink: './schema' },
  { id: 600, pid: 300, label: '数据集', icon: 'fto-settings', routerLink: './data' },
  { id: 700, pid: 300, label: '代码生成', icon: 'fto-code', routerLink: './code-generate' },
  { id: 9999, label: '基本信息', icon: 'fto-settings' },
  { id: 9001, pid: 9999, label: '用户管理', icon: 'fto-user', routerLink: './user' },
  { id: 9002, pid: 9999, label: '角色管理', icon: 'fto-users', routerLink: './role' },
  { id: 9003, pid: 9999, label: '资源管理', icon: 'fto-list', routerLink: './resource' },
  { id: 9004, pid: 9999, label: '缓存管理', icon: 'fto-hard-drive', routerLink: './cache' }
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
