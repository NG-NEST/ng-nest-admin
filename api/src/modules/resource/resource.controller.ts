import { CacheClear } from '@api/core';
import {
  ResourceCreateInput,
  Authorization,
  ResourceAuth,
  ResourceService,
  ResourceUpdateInput,
  ResourceCacheClear,
} from '@api/services';
import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';

@Controller('resource')
export class ResourceController {
  constructor(private resourceService: ResourceService) {}

  @Patch()
  @Authorization(ResourceAuth.ResourceUpdate)
  @CacheClear(...ResourceCacheClear)
  async update(@Body() data: ResourceUpdateInput) {
    return await this.resourceService.update(data);
  }

  @Post()
  @Authorization(ResourceAuth.ResourceCreate)
  @CacheClear(...ResourceCacheClear)
  async create(@Body() data: ResourceCreateInput) {
    return await this.resourceService.create(data);
  }

  @Delete(':id')
  @Authorization(ResourceAuth.ResourceDelete)
  @CacheClear(...ResourceCacheClear)
  async delete(@Param('id') id: string) {
    return await this.resourceService.delete(id);
  }
}
