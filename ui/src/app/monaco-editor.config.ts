export function CreateMonacoConfig() {
  (window as any).MonacoEnvironment = {
    getWorkerUrl: (_moduleId: string, label: string) => {
      //   const baseHref = document.baseURI.replace(/\/$/, '');

      const workerMapping: { [language: string]: string } = {
        json: `/assets/vs/language/json/json.worker.js`,
        typescript: `/assets/vs/language/typescript/ts.worker.js`,
        javascript: `/assets/vs/language/typescript/ts.worker.js`,
        default: `/assets/vs/editor/editor.worker.js`
      };

      return workerMapping[label] || workerMapping['default'];
    }
  };
}
