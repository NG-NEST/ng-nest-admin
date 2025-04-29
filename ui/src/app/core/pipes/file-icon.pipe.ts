import { Pipe, PipeTransform, inject } from '@angular/core';
import { XIconService } from '@ng-nest/ui/icon';
import { IconConfig } from 'src/app/icon.config';

@Pipe({
  name: 'appFileIcon'
})
export class AppFileIconPipe implements PipeTransform {
  iconService = inject(XIconService);

  constructor() {}
  transform(value: string): any {
    const filename = value;
    if (filename.indexOf('.') >= 0) {
      const ext = filename.split('.').pop();
      if (ext && Object.keys(IconConfig).includes(ext)) {
        return `admin:${ext}`;
      }
      return `admin:file`;
    }
    return `admin:file`;
  }
}
