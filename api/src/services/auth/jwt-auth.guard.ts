import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AUTH, JWT_CONSTANTS } from './auth.constants';
import { Request } from 'express';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { AuthI18n, AuthUnauthorized } from './auth.enum';
import { IS_PUBLIC_KEY } from './auth.metadata';
import { I18nTranslations } from '@api/generated';
import { RedisService } from '@api/core';
import { ConfigService } from '@nestjs/config';

export type HostType = 'http' | 'ws' | 'rpc' | 'graphql';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly config: ConfigService,
    private readonly redisService: RedisService,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const lang = I18nContext.current().lang;
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
      throw new UnauthorizedException(
        this.i18n.t(`${AuthI18n}.${AuthUnauthorized.Unauthorized}`, { lang }),
      );
    }
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException(
        this.i18n.t(`${AuthI18n}.${AuthUnauthorized.Unauthorized}`, { lang }),
      );
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: JWT_CONSTANTS.secret,
      });
      const sso = this.config.getOrThrow<boolean>('SSO');
      if (sso) {
        const { id } = payload;
        let rtoken = await this.redisService.get(`${AUTH}:${id}:accessToken`);
        if (rtoken !== token) {
          throw new UnauthorizedException(
            this.i18n.t(`${AuthI18n}.${AuthUnauthorized.Unauthorized}`, { lang }),
          );
        }
      }
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException(
        this.i18n.t(`${AuthI18n}.${AuthUnauthorized.Unauthorized}`, { lang }),
      );
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
