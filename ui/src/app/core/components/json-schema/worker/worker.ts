import { Observable } from 'rxjs';
import { XJsonSchema, XTreeData } from '../json-schema.type';
import { XJsonSchemaToTreeData, XTreeDataToJsonSchema } from '../json-schema.function';

export function XTreeDataToJsonSchemaWorker(tree: XTreeData[]): Observable<XJsonSchema> {
  return new Observable((x) => {
    if (typeof Worker !== 'undefined') {
      // Create a new
      const worker = new Worker(new URL('./json-schema.worker', import.meta.url));
      worker.onmessage = ({ data }) => {
        x.next(data);
        x.complete();
      };
      worker.postMessage(tree);
    } else {
      console.warn('Web workers are not supported in this environment.');
      x.next(XTreeDataToJsonSchema(tree));
      x.complete();
      // Web workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  });
}

export function XJsonSchemaToTreeDataWorker(jsonSchema: XJsonSchema): Observable<XTreeData[]> {
  return new Observable((x) => {
    if (typeof Worker !== 'undefined') {
      // Create a new
      const worker = new Worker(new URL('./tree-data.worker', import.meta.url));
      worker.onmessage = ({ data }) => {
        x.next(data);
        x.complete();
      };
      worker.postMessage(jsonSchema);
    } else {
      console.warn('Web workers are not supported in this environment.');
      x.next(XJsonSchemaToTreeData(jsonSchema));
      x.complete();
      // Web workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  });
}
