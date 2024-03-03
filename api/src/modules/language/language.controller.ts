import {
  CreateLanguageInput,
  Authorization,
  LanguageAuth,
  LanguageService,
  UpdateLanguageInput,
  Public,
} from '@api/services';
import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';

@Public()
@Controller('language')
export class LanguageController {
  constructor(private languageService: LanguageService) {}

  @Patch()
  @Authorization(LanguageAuth.LanguageUpdate)
  async updateLanguage(@Body() data: UpdateLanguageInput) {
    return await this.languageService.updateLanguage(data);
  }

  @Post()
  @Authorization(LanguageAuth.LanguageCreate)
  async createLanguage(@Body() data: CreateLanguageInput) {
    return await this.languageService.createLanguage(data);
  }

  @Delete(':id')
  @Authorization(LanguageAuth.LanguageDelete)
  async deleteLanguage(@Param('id') id: string) {
    return await this.languageService.deleteLanguage(id);
  }
}
