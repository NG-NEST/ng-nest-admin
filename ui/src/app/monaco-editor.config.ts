export function CreateMonacoConfig() {
  (window as any).MonacoEnvironment = {
    getWorkerUrl: (_moduleId: string, label: string) => {
      switch (label) {
        case 'json':
          return '/assets/vs/language/json/json.worker.js';
        case 'css':
        case 'scss':
        case 'less':
          return '/assets/vs/language/css/css.worker.js';
        case 'html':
        case 'handlebars':
        case 'razor':
          return '/assets/vs/language/html/html.worker.js';
        case 'typescript':
        case 'javascript':
          return '/assets/vs/language/typescript/ts.worker.js';
        default:
          return '/assets/vs/editor/editor.worker.js';
      }
    }
  };
}
