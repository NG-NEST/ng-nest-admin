import {
  ResourceCreateInput,
  Authorization,
  ResourceAuth,
  ResourceService,
  ResourceUpdateInput,
} from '@api/services';
import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';

@Controller('resource')
export class ResourceController {
  constructor(private resourceService: ResourceService) {}

  @Patch()
  @Authorization(ResourceAuth.ResourceUpdate)
  async update(@Body() data: ResourceUpdateInput) {
    return await this.resourceService.update(data);
  }

  @Post()
  @Authorization(ResourceAuth.ResourceCreate)
  async create(@Body() data: ResourceCreateInput) {
    return await this.resourceService.create(data);
  }

  @Delete(':id')
  @Authorization(ResourceAuth.ResourceDelete)
  async delete(@Param('id') id: string) {
    return await this.resourceService.delete(id);
  }
}
