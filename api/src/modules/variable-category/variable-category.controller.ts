import { CacheClear } from '@api/core';
import {
  VariableCategoryCreateInput,
  Authorization,
  VariableCategoryAuth,
  VariableCategoryService,
  VariableCategoryUpdateInput,
  VariableCategoryCacheClear,
} from '@api/services';
import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';

@Controller('variable-category')
export class VariableCategoryController {
  constructor(private variableCategoryService: VariableCategoryService) {}

  @Patch()
  @Authorization(VariableCategoryAuth.VariableCategoryUpdate)
  @CacheClear(...VariableCategoryCacheClear)
  async update(@Body() data: VariableCategoryUpdateInput) {
    return await this.variableCategoryService.update(data);
  }

  @Post()
  @Authorization(VariableCategoryAuth.VariableCategoryCreate)
  @CacheClear(...VariableCategoryCacheClear)
  async create(@Body() data: VariableCategoryCreateInput) {
    return await this.variableCategoryService.create(data);
  }

  @Delete(':id')
  @Authorization(VariableCategoryAuth.VariableCategoryDelete)
  @CacheClear(...VariableCategoryCacheClear)
  async delete(@Param('id') id: string) {
    return await this.variableCategoryService.delete(id);
  }
}
