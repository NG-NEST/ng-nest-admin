import { Injectable, CanActivate, ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export enum Route {
  CreateUser = 'CreateUser',
  DeleteUser = 'DeleteUser',
}

const ROUTES_KEY = 'routes';
export const Routes = (...routes: Route[]) => SetMetadata(ROUTES_KEY, routes);

@Injectable()
export class RoutesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoutes = this.reflector.getAllAndOverride<Route[]>(ROUTES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoutes) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const http = context.switchToHttp();
    const req = http.getRequest();
    console.log(req);
    return requiredRoutes.some((route) => user.routes?.includes(route));
  }
}
