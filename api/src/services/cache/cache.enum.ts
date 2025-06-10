export const CACHE_I18N = 'cache';

export enum CacheAuth {
  CacheCreate = 'cache-create',
  CacheUpdate = 'cache-update',
  CacheDelete = 'cache-delete',
  CacheDeleteAll = 'cache-delete-all',
}

export enum CacheDescription {
  Cache = 'Cache',

  Key = 'CacheKey',
  Value = 'Value',
  Expiretime = 'Expiretime',

  Id = 'Id',
  Type = 'Type',
  Keys = 'Keys',
}

export enum CacheResolverName {
  Cache = 'Cache',
  CacheKeys = 'CacheKeys',
  CacheGet = 'CacheGet',
}

export const CacheKey = { type: () => String, description: CacheDescription.Key };
