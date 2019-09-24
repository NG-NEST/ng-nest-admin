import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild,
  CanLoad,
  Route
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { environment } from "../environments/environment";
import * as _ from "lodash";
/**
 * 路由守卫
 *
 * @export
 * @class AuthGuard
 * @implements {CanActivate}
 * @implements {CanActivateChild}
 */
@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(public authService: AuthService, public router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLogin(state.url);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.canActivate(childRoute, state);
  }

  checkLogin(url: string) {
    if (this.authService.isLoggedIn || this.authService.user.token) {
      return true;
    }
    this.authService.redirectUrl = url;
    this.router.navigate(["/login"]);
    return false;
  }

  checkModule(route: Route) {
    if (
      route.path === environment.layout ||
      _.find(
        this.authService.user.permissions.menus,
        x => x.router === route.path
      )
    ) {
      return true;
    }
    this.router.navigate([`${environment.layout}/no-auth`]);
    return false;
  }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    let url = `/${route.path}`;
    return this.checkLogin(url) && this.checkModule(route);
  }
}
