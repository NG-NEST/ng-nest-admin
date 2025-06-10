import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appBase64ToString'
})
export class AppBase64ToStringPipe implements PipeTransform {
  transform(value: string, ..._args: any[]): any {
    try {
      return decodeURIComponent(
        atob(value)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
    } catch (e) {
      return value; // 或者处理异常情况
    }
  }
}
