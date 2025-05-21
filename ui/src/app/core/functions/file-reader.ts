import { Observable } from 'rxjs';

export function AppFileReader(file: File): Observable<string> {
  return new Observable((observer) => {
    const reader = new FileReader();

    // 成功读取
    reader.onload = () => {
      observer.next(reader.result as string);
      observer.complete();
    };

    // 错误处理
    reader.onerror = () => {
      observer.error(reader.error);
    };

    // 开始读取文件
    reader.readAsText(file);

    // 可选：支持取消订阅时中止读取
    return () => reader.abort();
  });
}
