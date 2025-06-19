import { Pipe, PipeTransform, inject } from '@angular/core';
import { XIconService } from '@ng-nest/ui/icon';
import { IconConfig } from 'src/app/icon.config';

@Pipe({
  name: 'appFileIcon'
})
export class AppFileIconPipe implements PipeTransform {
  iconService = inject(XIconService);

  transform(value: string): any {
    const filename = value;
    if (filename.indexOf('.') >= 0) {
      const ext = filename.split('.').pop()?.toLocaleLowerCase();
      if (ext && Object.keys(IconConfig).includes(ext)) {
        return `admin:${ext}`;
      }
      return `admin:file`;
    }
    return `admin:file`;
  }
}
