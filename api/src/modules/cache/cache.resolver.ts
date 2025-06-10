import { Resolver, Query, Args } from '@nestjs/graphql';
import { Cache, CacheGroup, CacheKeysInput, CacheResolverName, CacheService } from '@api/services';

@Resolver(() => Cache)
export class CacheResolver {
  constructor(private readonly cacheService: CacheService) {}

  @Query(() => [CacheGroup], {
    description: CacheResolverName.CacheKeys,
  })
  async cacheKeys(@Args() input: CacheKeysInput): Promise<CacheGroup[]> {
    return await this.cacheService.cacheKeys(input);
  }

  @Query(() => Cache, {
    description: CacheResolverName.CacheGet,
  })
  async cache(@Args('key') key: string) {
    return await this.cacheService.cache(key);
  }
}
