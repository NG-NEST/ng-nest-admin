import { BaseSelect, PrismaService } from '@api/core';
import { Injectable } from '@nestjs/common';
import { SubjectPaginationInput } from './pagination.input';
import { Subject } from './subject.model';
import { SubjectUpdateInput } from './update.input';
import { SubjectCreateInput } from './create.input';
import { SubjectSelectInput } from './select.input';
import { Resource } from '../resource';
import { SubjectPaginationOutput } from './subject.output';

@Injectable()
export class SubjectService {
  constructor(private prisma: PrismaService) {}

  async subjects(
    input: SubjectPaginationInput,
    select: BaseSelect,
  ): Promise<SubjectPaginationOutput> {
    const { where } = input;
    return {
      data: await this.prisma.subject.findMany({ ...input, ...select }),
      count: await this.prisma.subject.count({ where }),
    };
  }

  async subjectSelect(input: SubjectSelectInput, select: BaseSelect): Promise<Subject[]> {
    return await this.prisma.subject.findMany({ ...input, ...select });
  }

  async subjectResources(code: string, select: BaseSelect) {
    return (await this.prisma.resource.findMany({
      where: { subject: { code } },
      ...select,
    })) as Resource[];
  }

  async subject(id: string, select: BaseSelect): Promise<Subject> {
    return await this.prisma.subject.findUnique({ where: { id }, ...select });
  }

  async update(input: SubjectUpdateInput) {
    const { id, ...data } = input;
    return await this.prisma.subject.update({
      data,
      where: { id },
    });
  }

  async create(data: SubjectCreateInput) {
    return await this.prisma.subject.create({ data });
  }

  async delete(id: string) {
    return await this.prisma.subject.delete({ where: { id } });
  }
}
