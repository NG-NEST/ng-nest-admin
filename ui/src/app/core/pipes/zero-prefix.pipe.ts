import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appZeroPrefix'
})
export class AppZeroPrefixPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if ([null, undefined].includes(value)) return '';
    const val = Number(value);
    const len = args[0] || 2;
    if (Number(len) < String(value).length) {
      return val;
    }
    return (Array(len).join('0') + val).slice(-len);
  }
}
