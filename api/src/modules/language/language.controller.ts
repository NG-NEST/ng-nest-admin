import { CacheClear } from '@api/core';
import {
  LanguageCreateInput,
  Authorization,
  LanguageAuth,
  LanguageService,
  LanguageUpdateInput,
  Public,
  LanguageCacheClear,
} from '@api/services';
import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';

@Public()
@Controller('language')
export class LanguageController {
  constructor(private languageService: LanguageService) {}

  @Patch()
  @Authorization(LanguageAuth.LanguageUpdate)
  @CacheClear(...LanguageCacheClear)
  async update(@Body() data: LanguageUpdateInput) {
    return await this.languageService.update(data);
  }

  @Post()
  @Authorization(LanguageAuth.LanguageCreate)
  @CacheClear(...LanguageCacheClear)
  async create(@Body() data: LanguageCreateInput) {
    return await this.languageService.create(data);
  }

  @Delete(':id')
  @Authorization(LanguageAuth.LanguageDelete)
  @CacheClear(...LanguageCacheClear)
  async delete(@Param('id') id: string) {
    return await this.languageService.delete(id);
  }
}
