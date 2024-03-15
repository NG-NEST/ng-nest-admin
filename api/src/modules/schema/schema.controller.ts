import { CacheClear } from '@api/core';
import {
  SchemaCreateInput,
  Authorization,
  SchemaAuth,
  SchemaService,
  SchemaUpdateInput,
  SchemaCacheClear,
} from '@api/services';
import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';

@Controller('schema')
export class SchemaController {
  constructor(private schemaService: SchemaService) {}

  @Patch()
  @Authorization(SchemaAuth.SchemaUpdate)
  @CacheClear(...SchemaCacheClear)
  async update(@Body() data: SchemaUpdateInput) {
    return await this.schemaService.update(data);
  }

  @Post()
  @Authorization(SchemaAuth.SchemaCreate)
  @CacheClear(...SchemaCacheClear)
  async create(@Body() data: SchemaCreateInput) {
    return await this.schemaService.create(data);
  }

  @Delete(':id')
  @Authorization(SchemaAuth.SchemaDelete)
  @CacheClear(...SchemaCacheClear)
  async delete(@Param('id') id: string) {
    return await this.schemaService.delete(id);
  }
}
