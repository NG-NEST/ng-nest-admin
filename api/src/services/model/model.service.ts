import { BaseSelect, PrismaService } from '@api/core';
import { Injectable } from '@nestjs/common';
import { ModelPaginationInput } from './pagination.input';
import { Model } from './model.model';
import { ModelUpdateInput } from './update.input';
import { ModelCreateInput } from './create.input';
import { ModelSelectInput } from './select.input';
import { ModelPaginationOutput } from './model.output';

@Injectable()
export class ModelService {
    
  constructor(private prisma: PrismaService) { }

  async models(input: ModelPaginationInput, select: BaseSelect): Promise<ModelPaginationOutput> {
    const { where } = input;
    return {
      data: await this.prisma.model.findMany({ ...input, ...select }),
      count: await this.prisma.model.count({ where }),
    };
  }

  async modelSelect(input: ModelSelectInput, select: BaseSelect): Promise<Model[]> {
    return await this.prisma.model.findMany({ ...input, ...select });
  }

  async model(id: string, select: BaseSelect) {
    return (await this.prisma.model.findUnique({ where: { id }, ...select })) as Model;
  }

  async update(input: ModelUpdateInput) {
    const { id, ...data } = input;
    return await this.prisma.model.update({
      data,
      where: { id },
    });
  }

  async create(data: ModelCreateInput) {
    return await this.prisma.model.create({ data });
  }

  async delete(id: string) {
    return await this.prisma.model.delete({ where: { id } });
  }
}
