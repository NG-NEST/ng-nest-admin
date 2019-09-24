import {
  RouteReuseStrategy,
  ActivatedRouteSnapshot,
  DetachedRouteHandle
} from "@angular/router";
import * as _ from "lodash";

/**
 * 路由复用策略
 *
 * @export
 * @class ReuseStrategyService
 * @implements {RouteReuseStrategy}
 */
export class ReuseStrategyService implements RouteReuseStrategy {
  // 存储的复用路由
  public static handlers: { [key: string]: DetachedRouteHandle } = {};
  // 用一个临时变量记录待删除的路由
  private static waitDelete: string;

  /**
   * 表示对所有路由允许复用 如果你有路由不想利用可以在这加一些业务逻辑判断
   *
   * @param {ActivatedRouteSnapshot} route
   * @returns {boolean}
   * @memberof ReuseStrategyService
   */
  public shouldDetach(route: ActivatedRouteSnapshot): boolean {
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
  public store(
    route: ActivatedRouteSnapshot,
    handle: DetachedRouteHandle
  ): void {
    if (handle == null) return;
    if (
      ReuseStrategyService.waitDelete &&
      this.getRouteUrl(route).indexOf(ReuseStrategyService.waitDelete) == 0
    ) {
      //如果待删除是当前路由则不存储快照
      ReuseStrategyService.waitDelete = null;
      return;
    }
    ReuseStrategyService.handlers[this.getRouteUrl(route)] = handle;
  }

  /**
   * 若 path 在缓存中有的都认为允许还原路由
   *
   * @param {ActivatedRouteSnapshot} route
   * @returns {boolean}
   * @memberof ReuseStrategyService
   */
  public shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!ReuseStrategyService.handlers[this.getRouteUrl(route)];
  }

  /**
   * 从缓存中获取快照，若无则返回nul
   *
   * @param {ActivatedRouteSnapshot} route
   * @returns {DetachedRouteHandle}
   * @memberof ReuseStrategyService
   */
  public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    if (!route.routeConfig) {
      return null;
    }
    return ReuseStrategyService.handlers[this.getRouteUrl(route)];
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
  public shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    return (
      future.routeConfig === curr.routeConfig &&
      JSON.stringify(future.params) == JSON.stringify(curr.params)
    );
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
    let url = route["_routerState"].url.replace(/\//g, "_");
    // if (!route.routeConfig.loadChildren) {
    //     url += `${route.routeConfig.component.toString().split('(')[0].split(' ')[1]}`
    // }
    // + '_' + (route.routeConfig.loadChildren || route.routeConfig.component.toString().split('(')[0].split(' ')[1]);
    return url;
  }

  /**
   * 删除复用的路由
   *
   * @static
   * @param {string} name
   * @memberof ReuseStrategyService
   */
  public static deleteRouteSnapshot(name?: string): void {
    if (name) {
      let handle = name.replace(/\//g, "_");
      _.findKey(ReuseStrategyService.handlers, (x, y) => {
        if (y.indexOf(handle) === 0) {
          // let sub = ReuseStrategyService.handlers[y]['componentRef']['instance']['sub']
          // if(sub) sub.unsubscribe();
          delete ReuseStrategyService.handlers[y];
        }
      });
      ReuseStrategyService.waitDelete = handle;
    } else {
      for (let key in ReuseStrategyService.handlers) {
        delete ReuseStrategyService.handlers[key];
      }
    }
  }
}
