import { BaseSelect, PrismaService } from '@api/core';
import { Injectable } from '@nestjs/common';
import { SubjectPaginationInput } from './pagination.input';
import { Subject } from './subject.model';
import { SubjectUpdateInput } from './update.input';
import { SubjectCreateInput } from './create.input';

@Injectable()
export class SubjectService {
  constructor(private prisma: PrismaService) {}

  async subjects(input: SubjectPaginationInput, select: BaseSelect) {
    const { where } = input;
    return {
      data: (await this.prisma.subject.findMany({ ...input, ...select })) as Subject[],
      count: await this.prisma.subject.count({ where }),
    };
  }

  async subjectSelect(select: BaseSelect) {
    return await this.prisma.subject.findMany({ ...select });
  }

  async subjectResources(code: string, select: BaseSelect) {
    return await this.prisma.resource.findMany({ where: { subject: { code } }, ...select });
  }

  async subject(id: string, select: BaseSelect) {
    return (await this.prisma.subject.findUnique({ where: { id }, ...select })) as Subject;
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
