import { BaseSelect, PrismaService } from '@api/core';
import { Injectable } from '@nestjs/common';
import { DictionaryPaginationInput } from './dictionary-pagination.input';
import { Dictionary } from './dictionary.model';
import { UpdateDictionaryInput } from './update.input';
import { CreateDictionaryInput } from './create.input';

@Injectable()
export class DictionaryService {
  constructor(private prisma: PrismaService) {}

  async dictionaries(input: DictionaryPaginationInput, select: BaseSelect) {
    const { where } = input;
    return {
      data: (await this.prisma.dictionary.findMany({ ...input, ...select })) as Dictionary[],
      count: await this.prisma.dictionary.count({ where }),
    };
  }

  async dictionarySelect(id: string, select: BaseSelect) {
    return await this.prisma.dictionary.findMany({ where: { id }, ...select });
  }

  async dictionary(id: string, select: BaseSelect) {
    return (await this.prisma.dictionary.findUnique({ where: { id }, ...select })) as Dictionary;
  }

  async updateDictionary(input: UpdateDictionaryInput) {
    const { id, ...data } = input;
    return await this.prisma.dictionary.update({
      data,
      where: { id },
    });
  }

  async createDictionary(input: CreateDictionaryInput) {
    const { pid, ...other } = input;
    const data = { ...other, parent: {} };
    if (pid) {
      data.parent = { connect: { id: pid } };
    }
    return await this.prisma.dictionary.create({
      data,
    });
  }

  async deleteDictionary(id: string) {
    return await this.prisma.dictionary.delete({ where: { id } });
  }
}
