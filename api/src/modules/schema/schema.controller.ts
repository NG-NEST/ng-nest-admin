import {
  SchemaCreateInput,
  Authorization,
  SchemaAuth,
  SchemaService,
  SchemaUpdateInput,
} from '@api/services';
import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';

@Controller('schema')
export class SchemaController {
  constructor(private schemaService: SchemaService) {}

  @Patch()
  @Authorization(SchemaAuth.SchemaUpdate)
  async update(@Body() data: SchemaUpdateInput) {
    return await this.schemaService.update(data);
  }

  @Post()
  @Authorization(SchemaAuth.SchemaCreate)
  async create(@Body() data: SchemaCreateInput) {
    return await this.schemaService.create(data);
  }

  @Delete(':id')
  @Authorization(SchemaAuth.SchemaDelete)
  async delete(@Param('id') id: string) {
    return await this.schemaService.delete(id);
  }
}
