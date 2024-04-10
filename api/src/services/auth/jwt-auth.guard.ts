import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JWT_CONSTANTS } from './auth.constants';
import { Request } from 'express';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { AUTH_I18N, AuthUnauthorized } from './auth.enum';
import { IS_PUBLIC_KEY } from './auth.metadata';
import { AuthService } from './auth.service';
import { I18nService } from '@api/core';

export type HostType = 'http' | 'ws' | 'rpc' | 'graphql';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly auth: AuthService,
    private readonly i18n: I18nService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const type = context.getType<HostType>();
    let request: Request;
    if (type === 'http') {
      request = context.switchToHttp().getRequest();
    } else if (type === 'graphql') {
      const ctx = GqlExecutionContext.create(context);
      request = ctx.getContext().req;
    }
    if (!request) {
      throw new UnauthorizedException(this.i18n.t(`${AUTH_I18N}.${AuthUnauthorized.Unauthorized}`));
    }
    const token = this.auth.extractTokenFromHeader(request.headers);
    if (!token) {
      throw new UnauthorizedException(this.i18n.t(`${AUTH_I18N}.${AuthUnauthorized.Unauthorized}`));
    }
    try {
      const payload = await this.auth.verifyToken('accessToken', token, JWT_CONSTANTS.secret);
      if (!payload) {
        throw new UnauthorizedException(
          this.i18n.t(`${AUTH_I18N}.${AuthUnauthorized.Unauthorized}`),
        );
      }
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException(this.i18n.t(`${AUTH_I18N}.${AuthUnauthorized.Unauthorized}`));
    }
    return true;
  }
}
