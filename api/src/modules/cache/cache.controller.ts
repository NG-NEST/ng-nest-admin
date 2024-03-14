import { Authorization, CacheAuth, CacheService, CacheUpdateInput } from '@api/services';
import { Body, Controller, Delete, Patch } from '@nestjs/common';

@Controller('cache')
export class CacheController {
  constructor(private readonly cacheService: CacheService) {}

  @Patch()
  @Authorization(CacheAuth.CacheUpdate)
  async update(@Body() data: CacheUpdateInput) {
    return await this.cacheService.update(data);
  }

  @Delete()
  @Authorization(CacheAuth.CacheDelete)
  async delete(@Body('key') key: string) {
    return await this.cacheService.delete(key);
  }

  @Delete('/all')
  @Authorization(CacheAuth.CacheDeleteAll)
  async deleteAll() {
    return await this.cacheService.deleteAll();
  }
}
