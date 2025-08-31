import { CacheClear } from '@api/core';
import {
  PromptCreateInput,
  Authorization,
  PromptAuth,
  PromptService,
  PromptUpdateInput,
  PromptCacheClear,
} from '@api/services';
import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';

@Controller('prompt')
export class PromptController {
    
  constructor(private promptService: PromptService) {}

  @Patch()
  @Authorization(PromptAuth.PromptUpdate)
  @CacheClear(...PromptCacheClear)
  async update(@Body() data: PromptUpdateInput) {
    return await this.promptService.update(data);
  }

  @Post()
  @Authorization(PromptAuth.PromptCreate)
  @CacheClear(...PromptCacheClear)
  async create(@Body() data: PromptCreateInput) {
    return await this.promptService.create(data);
  }

  @Delete(':id')
  @Authorization(PromptAuth.PromptDelete)
  @CacheClear(...PromptCacheClear)
  async delete(@Param('id') id: string) {
    return await this.promptService.delete(id);
  }
}
