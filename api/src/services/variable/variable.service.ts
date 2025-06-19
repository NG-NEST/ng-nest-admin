import { BaseSelect, PrismaService } from '@api/core';
import { Injectable } from '@nestjs/common';
import { VariablePaginationInput } from './pagination.input';
import { Variable } from './variable.model';
import { VariableUpdateInput } from './update.input';
import { VariableCreateInput } from './create.input';
import { VariableSelectInput } from './select.input';
import { VariablePaginationOutput } from './variable.output';
import { VariableSaveManyInput } from './save-many.input';

@Injectable()
export class VariableService {
  constructor(private prisma: PrismaService) {}

  RESOURCE_FILE_TYPE = 'file-type';
  RESOURCE_MEDIA_TYPE = 'media';
  RESOURCE_TEXT_TYPE = 'text';

  async variables(
    input: VariablePaginationInput,
    select: BaseSelect,
  ): Promise<VariablePaginationOutput> {
    const { where } = input;
    return {
      data: (await this.prisma.variable.findMany({ ...input, ...select })) as Variable[],
      count: await this.prisma.variable.count({ where }),
    };
  }

  async variableSelect(input: VariableSelectInput, select: BaseSelect) {
    return (await this.prisma.variable.findMany({ ...input, ...select })) as Variable[];
  }

  async variable(id: string, select: BaseSelect) {
    return (await this.prisma.variable.findUnique({ where: { id }, ...select })) as Variable;
  }

  async update(input: VariableUpdateInput) {
    const { id, ...data } = input;
    return await this.prisma.variable.update({
      data,
      where: { id },
    });
  }

  async saveMany(input: VariableSaveManyInput) {
    const { many, resourceId, variableCategoryId } = input;
    const currentMany = await this.prisma.variable.findMany({
      where: { resourceId: resourceId, variableCategoryId: variableCategoryId },
    });
    let transaction = [];
    const updateMany = many.filter((x) => x.id);
    for (let data of updateMany) {
      transaction.push(this.prisma.variable.update({ data, where: { id: data.id } }));
    }
    const deleteMany = currentMany.filter((x) => !updateMany.map((y) => y.id).includes(x.id));
    if (deleteMany.length > 0) {
      transaction.push(
        this.prisma.variable.deleteMany({ where: { id: { in: deleteMany.map((x) => x.id) } } }),
      );
    }
    const createMany = many
      .filter((x) => !x.id)
      .map((x) => {
        const { id, ...data } = x;
        return data;
      });
    for (let data of createMany) {
      transaction.push(this.prisma.variable.create({ data }));
    }

    return await this.prisma.$transaction(transaction);
  }

  async create(input: VariableCreateInput) {
    let { resourceId, variableCategoryId, ...other } = input;
    const data = {
      ...other,
      resource: { connect: { id: resourceId } },
      variableCategory: { connect: { id: variableCategoryId } },
    };
    return await this.prisma.variable.create({
      data,
    });
  }

  async delete(id: string) {
    return await this.prisma.variable.delete({ where: { id } });
  }
}
