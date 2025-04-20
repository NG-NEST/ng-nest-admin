import { CacheClear } from '@api/core';
import {
  CatalogueCreateInput,
  Authorization,
  CatalogueAuth,
  CatalogueService,
  CatalogueUpdateInput,
  CatalogueCacheClear,
} from '@api/services';
import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';

@Controller('catalogue')
export class CatalogueController {
  constructor(private catalogueService: CatalogueService) {}

  @Patch()
  @Authorization(CatalogueAuth.CatalogueUpdate)
  @CacheClear(...CatalogueCacheClear)
  async update(@Body() data: CatalogueUpdateInput) {
    return await this.catalogueService.update(data);
  }

  @Post()
  @Authorization(CatalogueAuth.CatalogueCreate)
  @CacheClear(...CatalogueCacheClear)
  async create(@Body() data: CatalogueCreateInput) {
    return await this.catalogueService.create(data);
  }

  @Delete(':id')
  @Authorization(CatalogueAuth.CatalogueDelete)
  @CacheClear(...CatalogueCacheClear)
  async delete(@Param('id') id: string) {
    return await this.catalogueService.delete(id);
  }
}
