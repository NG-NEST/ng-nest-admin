import { CacheClear } from '@api/core';
import {
  VariableCreateInput,
  Authorization,
  VariableAuth,
  VariableService,
  VariableUpdateInput,
  VariableCacheClear,
} from '@api/services';
import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';

@Controller('variable')
export class VariableController {
  constructor(private variableService: VariableService) {}

  @Patch()
  @Authorization(VariableAuth.VariableUpdate)
  @CacheClear(...VariableCacheClear)
  async update(@Body() data: VariableUpdateInput) {
    return await this.variableService.update(data);
  }

  @Post()
  @Authorization(VariableAuth.VariableCreate)
  @CacheClear(...VariableCacheClear)
  async create(@Body() data: VariableCreateInput) {
    return await this.variableService.create(data);
  }

  @Delete(':id')
  @Authorization(VariableAuth.VariableDelete)
  @CacheClear(...VariableCacheClear)
  async delete(@Param('id') id: string) {
    return await this.variableService.delete(id);
  }
}
