import {
  LanguageCreateInput,
  Authorization,
  LanguageAuth,
  LanguageService,
  LanguageUpdateInput,
  Public,
} from '@api/services';
import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';

@Public()
@Controller('language')
export class LanguageController {
  constructor(private languageService: LanguageService) {}

  @Patch()
  @Authorization(LanguageAuth.LanguageUpdate)
  async update(@Body() data: LanguageUpdateInput) {
    return await this.languageService.update(data);
  }

  @Post()
  @Authorization(LanguageAuth.LanguageCreate)
  async create(@Body() data: LanguageCreateInput) {
    return await this.languageService.create(data);
  }

  @Delete(':id')
  @Authorization(LanguageAuth.LanguageDelete)
  async delete(@Param('id') id: string) {
    return await this.languageService.delete(id);
  }
}
