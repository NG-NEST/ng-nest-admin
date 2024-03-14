import { BaseSelect, PrismaService } from '@api/core';
import { Injectable } from '@nestjs/common';
import { ResourcePaginationInput } from './pagination.input';
import { Resource } from './resource.model';
import { ResourceUpdateInput } from './update.input';
import { ResourceCreateInput } from './create.input';

@Injectable()
export class ResourceService {
  constructor(private prisma: PrismaService) {}

  async resources(input: ResourcePaginationInput, select: BaseSelect) {
    const { where } = input;
    return {
      data: (await this.prisma.resource.findMany({ ...input, ...select })) as Resource[],
      count: await this.prisma.resource.count({ where }),
    };
  }

  async resourceSelect(subjectId: string, select: BaseSelect) {
    return await this.prisma.resource.findMany({ where: { subjectId }, ...select });
  }

  async resource(id: string, select: BaseSelect) {
    return (await this.prisma.resource.findUnique({ where: { id }, ...select })) as Resource;
  }

  async update(input: ResourceUpdateInput) {
    const { id, ...data } = input;
    return await this.prisma.resource.update({
      data,
      where: { id },
    });
  }

  async create(input: ResourceCreateInput) {
    const { subjectId, pid, ...other } = input;
    const data = { ...other, subject: { connect: { id: subjectId } }, parent: {} };
    if (pid) {
      data.parent = { connect: { id: pid } };
    }
    return await this.prisma.resource.create({
      data,
    });
  }

  async delete(id: string) {
    return await this.prisma.resource.delete({ where: { id } });
  }
}
