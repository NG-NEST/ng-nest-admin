import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

/**
 * 预加载策略
 *
 * @export
 * @class PreloadingStrategyService
 * @implements {PreloadingStrategy}
 */
@Injectable()
export class PreloadingStrategyService implements PreloadingStrategy {
  // 需要预加载的模块
  preloadedModules: string[] = [];

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data.preload) {
      this.preloadedModules.push(route.path as string);
      return load();
    } else {
      return of(null);
    }
  }
}
