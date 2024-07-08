import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AUTH_I18N, AuthUnauthorized } from './auth.enum';
import { IS_PUBLIC_KEY, PERMISSION_KEY } from './auth.metadata';
import { I18nService } from '@api/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly i18n: I18nService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSION_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredPermissions) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    if (
      !user ||
      !requiredPermissions.some((permission) => user.permissions?.includes(permission))
    ) {
      return true
      throw new ForbiddenException(this.i18n.t(`${AUTH_I18N}.${AuthUnauthorized.Forbidden}`));
    }
    return true;
  }
}
