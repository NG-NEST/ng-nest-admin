import { BaseSelect, PrismaService } from '@api/core';
import { Injectable } from '@nestjs/common';
import { PromptPaginationInput } from './pagination.input';
import { Prompt } from './prompt.model';
import { PromptUpdateInput } from './update.input';
import { PromptCreateInput } from './create.input';
import { PromptSelectInput } from './select.input';
import { PromptPaginationOutput } from './prompt.output';

@Injectable()
export class PromptService {
  constructor(private prisma: PrismaService) {}

  async prompts(input: PromptPaginationInput, select: BaseSelect): Promise<PromptPaginationOutput> {
    const { where } = input;
    return {
      data: await this.prisma.prompt.findMany({ ...input, ...select }),
      count: await this.prisma.prompt.count({ where }),
    };
  }

  async promptSelect(input: PromptSelectInput, select: BaseSelect): Promise<Prompt[]> {
    return await this.prisma.prompt.findMany({ ...input, ...select });
  }

  async prompt(id: string, select: BaseSelect) {
    return (await this.prisma.prompt.findUnique({ where: { id }, ...select })) as Prompt;
  }

  async update(input: PromptUpdateInput) {
    const { id, ...data } = input;
    return await this.prisma.prompt.update({
      data,
      where: { id },
    });
  }

  async create(input: PromptCreateInput) {
    const { modelId, ...other } = input;
    const data = { ...other, model: { connect: { id: modelId } } };
    return await this.prisma.prompt.create({ data });
  }

  async delete(id: string) {
    return await this.prisma.prompt.delete({ where: { id } });
  }
}
