import {
  CreateResourceInput,
  Authorization,
  ResourceAuth,
  ResourceService,
  UpdateResourceInput,
} from '@api/services';
import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';

@Controller('resource')
export class ResourceController {
  constructor(private resourceService: ResourceService) {}

  @Patch()
  @Authorization(ResourceAuth.ResourceUpdate)
  async updateResource(@Body() data: UpdateResourceInput) {
    return await this.resourceService.updateResource(data);
  }

  @Post()
  @Authorization(ResourceAuth.ResourceCreate)
  async createResource(@Body() data: CreateResourceInput) {
    return await this.resourceService.createResource(data);
  }

  @Delete(':id')
  @Authorization(ResourceAuth.ResourceDelete)
  async deleteResource(@Param('id') id: string) {
    return await this.resourceService.deleteResource(id);
  }
}
