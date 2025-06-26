import { CacheClear } from '@api/core';
import {
  SchemaDataCreateInput,
  Authorization,
  SchemaDataAuth,
  SchemaDataService,
  SchemaDataUpdateInput,
  SchemaDataCacheClear,
} from '@api/services';
import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';

@Controller('schema-data')
export class SchemaDataController {
  constructor(private schemaDataService: SchemaDataService) {}

  @Patch()
  @Authorization(SchemaDataAuth.SchemaDataUpdate)
  @CacheClear(...SchemaDataCacheClear)
  async update(@Body() data: SchemaDataUpdateInput) {
    return await this.schemaDataService.update(data);
  }

  @Post()
  @Authorization(SchemaDataAuth.SchemaDataCreate)
  @CacheClear(...SchemaDataCacheClear)
  async create(@Body() data: SchemaDataCreateInput) {
    return await this.schemaDataService.create(data);
  }

  @Delete(':id')
  @Authorization(SchemaDataAuth.SchemaDataDelete)
  @CacheClear(...SchemaDataCacheClear)
  async delete(@Param('id') id: string) {
    return await this.schemaDataService.delete(id);
  }
}
