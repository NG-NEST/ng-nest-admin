import { Injectable } from '@nestjs/common';
import { CACHE_PREFIX, RedisService } from '@api/core';
import { CacheKeysInput } from './cache-keys.input';
import { Cache } from './cache.model';
import { UpdateCacheInput } from './update.input';
import { isEmpty } from 'class-validator';

@Injectable()
export class CacheService {
  constructor(private readonly redisService: RedisService) {}
  async cacheKeys(input: CacheKeysInput) {
    const { key } = input;
    const keys = await this.redisService.keys(`${CACHE_PREFIX}:${key}:*`);
    const regex = new RegExp(`^${CACHE_PREFIX}:`);
    return keys.map((key) => {
      return key.replace(regex, '');
    });
  }

  async cache(key: string): Promise<Cache> {
    const cacheKey = `${CACHE_PREFIX}:${key}`;
    const value = await this.redisService.get(cacheKey);
    const expiretime = await this.redisService.expiretime(cacheKey);

    return { key, value, expiretime: new Date(expiretime * 1000).toISOString() };
  }

  async deleteCache(key: string) {
    const cacheKey = `${CACHE_PREFIX}:${key}`;
    return await this.redisService.del(cacheKey);
  }

  async updateCache(input: UpdateCacheInput): Promise<string> {
    const { key, value, expiretime } = input;
    const cacheKey = `${CACHE_PREFIX}:${key}`;
    const beforeExpiretime = await this.redisService.expiretime(cacheKey);
    if (!isEmpty(value) && isEmpty(expiretime)) {
      return await this.redisService.set(cacheKey, value, 'EXAT', beforeExpiretime);
    } else if (!isEmpty(value) && !isEmpty(expiretime)) {
      return await this.redisService.set(
        cacheKey,
        value,
        'EXAT',
        new Date(expiretime).getSeconds(),
      );
    } else if (isEmpty(value) && !isEmpty(expiretime)) {
      const ex = await this.redisService.expire(cacheKey, new Date(expiretime).getSeconds());
      return ex.toString();
    }
    return null;
  }
}
