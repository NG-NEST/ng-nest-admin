import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';
import { ConfigService } from './config.service';

/**
 * 路由复用策略
 *
 * @export
 * @class ReuseStrategyService
 * @implements {RouteReuseStrategy}
 */
export class ReuseStrategyService implements RouteReuseStrategy {
  constructor(private config: ConfigService) {}

  /**
   * 表示对所有路由允许复用 如果你有路由不想利用可以在这加一些业务逻辑判断
   *
   * @param {ActivatedRouteSnapshot} _route
   * @returns {boolean}
   * @memberof ReuseStrategyService
   */
  public shouldDetach(_route: ActivatedRouteSnapshot): boolean {
    return true;
  }

  /**
   * 当路由离开时会触发。按path作为key存储路由快照&组件当前实例对象
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {DetachedRouteHandle} handle
   * @returns {void}
   * @memberof ReuseStrategyService
   */
  public store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    const key = this.getRouteUrl(route);
    if (this.config.waitDelete === key) {
      return;
    }
    this.config.handlers[key] = handle;
  }

  /**
   * 若 path 在缓存中有的都认为允许还原路由
   *
   * @param {ActivatedRouteSnapshot} route
   * @returns {boolean}
   * @memberof ReuseStrategyService
   */
  public shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!this.config.handlers[this.getRouteUrl(route)];
  }

  /**
   * 从缓存中获取快照，若无则返回nul
   *
   * @param {ActivatedRouteSnapshot} route
   * @returns {DetachedRouteHandle}
   * @memberof ReuseStrategyService
   */
  public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    if (!route.component) return null;
    return this.config.handlers[this.getRouteUrl(route)];
  }

  /**
   * 进入路由触发，判断是否同一路由
   * 解决不同的参数也会认为是同一个路由，导致会将之前的路由拿出来复用
   *
   * @param {ActivatedRouteSnapshot} future
   * @param {ActivatedRouteSnapshot} curr
   * @returns {boolean}
   * @memberof ReuseStrategyService
   */
  public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    const reuse = future.routeConfig === curr.routeConfig && JSON.stringify(future.params) == JSON.stringify(curr.params);
    return reuse;
  }

  /**
   * 解决不同的主路由会存在相同名称的子路由
   *
   * @private
   * @param {ActivatedRouteSnapshot} route
   * @returns
   * @memberof ReuseStrategyService
   */
  private getRouteUrl(route: ActivatedRouteSnapshot) {
    let url = (route as any)['_routerState'].url.replace(/\//g, '_');
    return url;
  }
}
