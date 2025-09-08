import { XMenuNode } from '@ng-nest/ui/menu';

export const AppMenus: XMenuNode[] = [
  { id: 100, label: '总览', icon: 'fto-home', routerLink: './overview' },
  { id: 200, label: 'AI 模型', icon: 'fto-package' },
  { id: 210, pid: 200, label: '对话模型', icon: 'fto-message-square', routerLink: './aigc' },
  { id: 220, pid: 200, label: '模型管理', icon: 'ado-profile', routerLink: './model' },
  { id: 230, pid: 200, label: '提示词管理', icon: 'fto-type', routerLink: './prompt' },
  { id: 300, label: '领域数据', icon: 'fto-layers' },
  { id: 500, pid: 300, label: '数据定义', icon: 'admin:json', routerLink: './schema' },
  { id: 600, pid: 300, label: '数据集', icon: 'admin:json-data', routerLink: './data' },
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
