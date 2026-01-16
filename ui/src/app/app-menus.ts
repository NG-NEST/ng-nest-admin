import { XMenuNode } from '@ng-nest/ui/menu';

export const AppMenus: XMenuNode[] = [
  { id: 100, label: '$menu.overview', icon: 'fto-home', routerLink: './overview' },
  { id: 200, label: '$menu.aiModel', icon: 'fto-package' },
  { id: 210, pid: 200, label: '$menu.chatModel', icon: 'fto-message-square', routerLink: './aigc' },
  { id: 220, pid: 200, label: '$menu.modelManage', icon: 'ado-profile', routerLink: './model' },
  { id: 230, pid: 200, label: '$menu.promptManage', icon: 'fto-type', routerLink: './prompt' },
  { id: 300, label: '$menu.domainData', icon: 'fto-layers' },
  { id: 500, pid: 300, label: '$menu.schemaDefine', icon: 'admin:json', routerLink: './schema' },
  { id: 600, pid: 300, label: '$menu.dataset', icon: 'admin:json-data', routerLink: './data' },
  { id: 700, pid: 300, label: '$menu.codeGenerate', icon: 'fto-code', routerLink: './code-generate' },
  { id: 9999, label: '$menu.baseInfo', icon: 'fto-settings' },
  { id: 9001, pid: 9999, label: '$menu.userManage', icon: 'fto-user', routerLink: './user' },
  { id: 9002, pid: 9999, label: '$menu.roleManage', icon: 'fto-users', routerLink: './role' },
  { id: 9003, pid: 9999, label: '$menu.resourceManage', icon: 'fto-list', routerLink: './resource' },
  { id: 9004, pid: 9999, label: '$menu.cacheManage', icon: 'fto-hard-drive', routerLink: './cache' }
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
