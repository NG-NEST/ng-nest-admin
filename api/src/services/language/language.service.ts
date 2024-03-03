import { BaseSelect, PrismaService } from '@api/core';
import { Injectable } from '@nestjs/common';
import { LanguagePaginationInput } from './language-pagination.input';
import { Language } from './language.model';
import { UpdateLanguageInput } from './update.input';
import { CreateLanguageInput } from './create.input';

@Injectable()
export class LanguageService {
  constructor(private prisma: PrismaService) {}

  async languages(input: LanguagePaginationInput, select: BaseSelect) {
    const { where } = input;
    return {
      data: (await this.prisma.language.findMany({ ...input, ...select })) as Language[],
      count: await this.prisma.language.count({ where })
    };
  }

  async languageSelect(select: BaseSelect) {
    return await this.prisma.language.findMany({ ...select });
  }

  async language(id: string, select: BaseSelect) {
    return (await this.prisma.language.findUnique({ where: { id }, ...select })) as Language;
  }

  async updateLanguage(input: UpdateLanguageInput) {
    const { id, ...data } = input;
    return await this.prisma.language.update({
      data,
      where: { id }
    });
  }

  async createLanguage(data: CreateLanguageInput) {
    return await this.prisma.language.create({ data });
  }

  async deleteLanguage(id: string) {
    return await this.prisma.language.delete({ where: { id } });
  }
}
