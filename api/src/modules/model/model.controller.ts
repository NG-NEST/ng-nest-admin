import { CacheClear } from '@api/core';
import {
  ModelCreateInput,
  Authorization,
  ModelAuth,
  ModelService,
  ModelUpdateInput,
  ModelCacheClear,
} from '@api/services';
import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';

@Controller('model')
export class ModelController {
    
  constructor(private modelService: ModelService) {}

  @Patch()
  @Authorization(ModelAuth.ModelUpdate)
  @CacheClear(...ModelCacheClear)
  async update(@Body() data: ModelUpdateInput) {
    return await this.modelService.update(data);
  }

  @Post()
  @Authorization(ModelAuth.ModelCreate)
  @CacheClear(...ModelCacheClear)
  async create(@Body() data: ModelCreateInput) {
    return await this.modelService.create(data);
  }

  @Delete(':id')
  @Authorization(ModelAuth.ModelDelete)
  @CacheClear(...ModelCacheClear)
  async delete(@Param('id') id: string) {
    return await this.modelService.delete(id);
  }
}
