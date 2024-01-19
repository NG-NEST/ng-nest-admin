import { Body, Controller, Delete, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateResourceInput, UpdateResourceInput } from '@api/dto';
import { ResourceService } from './resource.service';
import { JwtAuthGuard } from '../auth';

@UseGuards(JwtAuthGuard)
@Controller('resource')
export class ResourceController {
  constructor(private resourceService: ResourceService) {}

  @Put()
  async updateResource(@Body() data: UpdateResourceInput) {
    return await this.resourceService.updateResource(data);
  }

  @Post()
  async createResource(@Body() data: CreateResourceInput) {
    return await this.resourceService.createResource(data);
  }

  @Delete(':id')
  async deleteResource(@Param('id') id: string) {
    return await this.resourceService.deleteResource(id);
  }
}
