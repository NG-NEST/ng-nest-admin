import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { AuthI18n, AuthUnauthorized } from './auth.enum';
import { IS_PUBLIC_KEY, PERMISSION_KEY } from './auth.metadata';
import { I18nTranslations } from '@api/generated';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const lang = I18nContext.current().lang;
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
      throw new ForbiddenException(
        this.i18n.t(`${AuthI18n}.${AuthUnauthorized.Forbidden}`, { lang }),
      );
    }
    return true;
  }
}
