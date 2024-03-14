import {
  DictionaryCreateInput,
  Authorization,
  DictionaryAuth,
  DictionaryService,
  DictionaryUpdateInput,
} from '@api/services';
import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';

@Controller('dictionary')
export class DictionaryController {
  constructor(private dictionaryService: DictionaryService) {}

  @Patch()
  @Authorization(DictionaryAuth.DictionaryUpdate)
  async update(@Body() data: DictionaryUpdateInput) {
    return await this.dictionaryService.update(data);
  }

  @Post()
  @Authorization(DictionaryAuth.DictionaryCreate)
  async create(@Body() data: DictionaryCreateInput) {
    return await this.dictionaryService.create(data);
  }

  @Delete(':id')
  @Authorization(DictionaryAuth.DictionaryDelete)
  async delete(@Param('id') id: string) {
    return await this.dictionaryService.delete(id);
  }
}
