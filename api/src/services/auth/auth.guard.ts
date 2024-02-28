import {
  Injectable,
  CanActivate,
  ExecutionContext,
  SetMetadata,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { AuthI18n, AuthUnauthorized } from './auth.enum';

const PERMISSION_KEY = 'routes';
export const Authorization = (...routes: string[]) => SetMetadata(PERMISSION_KEY, routes);

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private i18n: I18nService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const lang = I18nContext.current().lang;
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
