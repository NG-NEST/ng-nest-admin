import { BaseSelect, PrismaService } from '@api/core';
import { Injectable } from '@nestjs/common';
import { VariableCategoryPaginationInput } from './pagination.input';
import { VariableCategory } from './variable-category.model';
import { VariableCategoryUpdateInput } from './update.input';
import { VariableCategoryCreateInput } from './create.input';
import { VariableCategorySelectInput } from './select.input';
import { VariableCategoryPaginationOutput } from './variable-category.output';

@Injectable()
export class VariableCategoryService {
  constructor(private prisma: PrismaService) {}

  RESOURCE_FILE_TYPE = 'file-type';
  RESOURCE_MEDIA_TYPE = 'media';
  RESOURCE_TEXT_TYPE = 'text';

  async variableCategorys(
    input: VariableCategoryPaginationInput,
    select: BaseSelect,
  ): Promise<VariableCategoryPaginationOutput> {
    const { where } = input;
    return {
      data: (await this.prisma.variableCategory.findMany({
        ...input,
        ...select,
      })) as VariableCategory[],
      count: await this.prisma.variableCategory.count({ where }),
    };
  }

  async variableCategorySelect(input: VariableCategorySelectInput, select: BaseSelect) {
    return (await this.prisma.variableCategory.findMany({
      ...input,
      ...select,
    })) as VariableCategory[];
  }

  async variableCategory(id: string, select: BaseSelect) {
    return (await this.prisma.variableCategory.findUnique({
      where: { id },
      ...select,
    })) as VariableCategory;
  }

  async update(input: VariableCategoryUpdateInput) {
    const { id, ...data } = input;
    return await this.prisma.variableCategory.update({
      data,
      where: { id },
    });
  }

  async create(input: VariableCategoryCreateInput) {
    let { resourceId, ...other } = input;
    const data = { ...other, resource: { connect: { id: resourceId } } };
    return await this.prisma.variableCategory.create({
      data,
    });
  }

  async delete(id: string) {
    return await this.prisma.variableCategory.delete({ where: { id } });
  }
}
