import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, of, tap } from 'rxjs';
import { RedisService } from '../services';
import { Reflector } from '@nestjs/core';
import { CACHE_PREFIX, CACHE_CONTROL_METADATA, CACHE_CLEAR_METADATA } from '../decorators';
import { ConfigService } from '@nestjs/config';
import { ContextType } from '../common';

@Injectable()
export class CacheControlInterceptor implements NestInterceptor {
  constructor(
    private readonly redisService: RedisService,
    private readonly reflector: Reflector,
    private readonly config: ConfigService,
  ) {}
  async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
    let key = this.reflector.get(CACHE_CONTROL_METADATA, context.getHandler());

    if (!key) {
      return next.handle();
    }
    try {
      key = this.setKey(key, context);
      const data = await this.redisService.get(key);
      const exttl = this.config.getOrThrow<number>('REDIS_CACHE_TTL');
      if (data !== null && data !== undefined) {
        const ttl = await this.redisService.ttl(key);
        if (ttl < exttl / 2) {
          await this.redisService.expire(key, exttl);
        }
        return of(JSON.parse(data));
      }
      return next.handle().pipe(
        tap(async (tap) => {
          await this.redisService.set(key, JSON.stringify(tap), 'EX', exttl);
        }),
      );
    } catch {
      return next.handle();
    }
  }

  setKey(key: string, context: ExecutionContext) {
    const contextType = context.getType<ContextType>();
    let result = `${CACHE_PREFIX}:${key}`;
    if (contextType === 'graphql') {
      const req = context.getArgByIndex(2).req;
      const bodyString = JSON.stringify(req.body).replace(/\\n/g, '').replace(/\s+/g, ' ');
      const bodyBase64 = Buffer.from(bodyString, 'utf-8').toString('base64');
      return `${result}:${bodyBase64}`;
    }

    return result;
  }
}

@Injectable()
export class CacheClearInterceptor implements NestInterceptor {
  constructor(
    private readonly redisService: RedisService,
    private readonly reflector: Reflector,
  ) {}
  async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
    const keys = this.reflector.get(CACHE_CLEAR_METADATA, context.getHandler());
    if (!keys || keys.length === 0) {
      return next.handle();
    }
    try {
      return next.handle().pipe(
        tap(async () => {
          const delKeys: string[] = [];
          for (const key of keys) {
            const keyPattern = `${CACHE_PREFIX}:${key}:*`;
            const findKeys = await this.redisService.keys(`${keyPattern}`);
            delKeys.push(...findKeys);
          }
          await this.redisService.del(delKeys);
        }),
      );
    } catch {
      return next.handle();
    }
  }
}
