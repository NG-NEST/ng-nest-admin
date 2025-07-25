import { BadRequestException, Injectable } from '@nestjs/common';
import { CACHE_PREFIX, RedisService, ValidatorDescription, I18nService } from '@api/core';
import { CacheKeysInput } from './cache-keys.input';
import { Cache } from './cache.model';
import { CacheUpdateInput } from './update.input';
import { isEmpty } from 'class-validator';
import { CacheDescription, CACHE_I18N } from './cache.enum';
import { orderBy } from 'lodash-es';

@Injectable()
export class CacheService {
  constructor(
    private readonly redisService: RedisService,
    private readonly i18n: I18nService,
  ) {}
  async cacheKeys(input: CacheKeysInput) {
    const { key } = input;
    const keys = await this.redisService.keys(`${CACHE_PREFIX}:${key}:*`);
    const regex = new RegExp(`^${CACHE_PREFIX}:`);

    const grouped = keys
      .map((key) => {
        return key.replace(regex, '');
      })
      .reduce(
        (acc, str) => {
          const [prefix, suffix] = str.split(':');
          if (!acc[prefix]) {
            acc[prefix] = [];
          }
          acc[prefix].push(suffix);
          return acc;
        },
        {} as Record<string, string[]>,
      );

    return orderBy(
      Object.entries(grouped).map(([type, keys]) => ({
        id: type,
        type,
        keys,
      })),
      'type',
      'asc',
    );
  }

  async cache(key: string): Promise<Cache> {
    const cacheKey = `${CACHE_PREFIX}:${key}`;

    const isExit = await this.redisService.exists(cacheKey);
    if (isExit === 0) {
      throw new BadRequestException(
        this.i18n.t(`${CACHE_I18N}.${CacheDescription.Key}${ValidatorDescription.IsNotExist}`),
      );
    }

    const value = await this.redisService.get(cacheKey);
    const expiretime = await this.redisService.expiretime(cacheKey);

    return { key, value, expiretime: new Date(expiretime * 1000).toISOString() };
  }

  async delete(key: string) {
    const cacheKey = `${CACHE_PREFIX}:${key}`;
    return await this.redisService.del(cacheKey);
  }

  async deleteAll() {
    const cacheKey = `${CACHE_PREFIX}:*`;
    const keys = await this.redisService.keys(cacheKey);
    if (keys.length > 0) {
      return await this.redisService.del(keys);
    }
    return 0;
  }

  async deleteType(type: string) {
    const cacheKey = `${CACHE_PREFIX}:${type}:*`;
    const keys = await this.redisService.keys(cacheKey);
    if (keys.length > 0) {
      return await this.redisService.del(keys);
    }
    return 0;
  }

  async update(input: CacheUpdateInput): Promise<string> {
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
        new Date(expiretime).getTime() / 1000,
      );
    } else if (isEmpty(value) && !isEmpty(expiretime)) {
      const ex = await this.redisService.expireat(cacheKey, new Date(expiretime).getTime() / 1000);
      return ex.toString();
    }
    return null;
  }
}
