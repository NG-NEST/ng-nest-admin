import {
  CreateDictionaryInput,
  Authorization,
  DictionaryAuth,
  DictionaryService,
  UpdateDictionaryInput,
} from '@api/services';
import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';

@Controller('dictionary')
export class DictionaryController {
  constructor(private dictionaryService: DictionaryService) {}

  @Patch()
  @Authorization(DictionaryAuth.DictionaryUpdate)
  async updateDictionary(@Body() data: UpdateDictionaryInput) {
    return await this.dictionaryService.updateDictionary(data);
  }

  @Post()
  @Authorization(DictionaryAuth.DictionaryCreate)
  async createDictionary(@Body() data: CreateDictionaryInput) {
    return await this.dictionaryService.createDictionary(data);
  }

  @Delete(':id')
  @Authorization(DictionaryAuth.DictionaryDelete)
  async deleteDictionary(@Param('id') id: string) {
    return await this.dictionaryService.deleteDictionary(id);
  }
}
