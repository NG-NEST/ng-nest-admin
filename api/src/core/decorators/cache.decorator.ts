import { SetMetadata } from '@nestjs/common';

export const CACHE_PREFIX = 'Cache';

export const CACHE_CONTROL_METADATA = 'cache_control';
export const CacheControl = (key: string) => SetMetadata(CACHE_CONTROL_METADATA, key);

export const CACHE_CLEAR_METADATA = 'cache_clear';
export const CacheClear = (...keys: string[]) => SetMetadata(CACHE_CLEAR_METADATA, keys);
