import { Authorization, CacheAuth, CacheService, UpdateCacheInput } from '@api/services';
import { Body, Controller, Delete, Patch } from '@nestjs/common';

@Controller('cache')
export class CacheController {
  constructor(private readonly cacheService: CacheService) {}

  @Patch()
  @Authorization(CacheAuth.CacheUpdate)
  async updateDictionary(@Body() data: UpdateCacheInput) {
    return await this.cacheService.updateCache(data);
  }

  @Delete()
  // @Authorization(CacheAuth.CacheDelete)
  async deleteCache(@Body('key') key: string) {
    console.log(key);
    return await this.cacheService.deleteCache(key);
  }
}
