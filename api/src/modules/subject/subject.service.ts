import { BaseSelect, PrismaService } from '@api/core';
import { Injectable } from '@nestjs/common';
import { Subject, CreateSubjectInput, UpdateSubjectInput, SubjectPaginationInput } from '@api/dto';

@Injectable()
export class SubjectService {
  constructor(private prisma: PrismaService) {}

  async subjects(input: SubjectPaginationInput, select: BaseSelect) {
    const { where } = input;
    return {
      data: (await this.prisma.subject.findMany({ ...input, ...select })) as Subject[],
      count: await this.prisma.subject.count({ where })
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

  async updateSubject(input: UpdateSubjectInput) {
    const { id, ...data } = input;
    return await this.prisma.subject.update({
      data,
      where: { id }
    });
  }

  async createSubject(data: CreateSubjectInput) {
    return await this.prisma.subject.create({ data });
  }

  async deleteSubject(id: string) {
    return await this.prisma.subject.delete({ where: { id } });
  }
}
