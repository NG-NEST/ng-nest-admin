import { BaseSelect, PrismaService } from '@api/core';
import { Injectable } from '@nestjs/common';
import { PermissionPaginationInput } from './pagination.input';
import { PermissionCreateInput } from './create.input';
import { PermissionUpdateInput } from './update.input';
import { Permission } from './permission.model';

@Injectable()
export class PermissionService {
  constructor(private prisma: PrismaService) {}

  async permissions(input: PermissionPaginationInput, select: BaseSelect) {
    const { where } = input;
    return {
      data: (await this.prisma.permission.findMany({ ...input, ...select })) as Permission[],
      count: await this.prisma.permission.count({ where }),
    };
  }

  async permissionSelect(select: BaseSelect) {
    return await this.prisma.permission.findMany({ ...select });
  }

  async permission(id: string, select: BaseSelect) {
    return (await this.prisma.permission.findUnique({ where: { id }, ...select })) as Permission;
  }

  async update(input: PermissionUpdateInput) {
    const { id, ...data } = input;
    return await this.prisma.permission.update({
      data,
      where: { id },
    });
  }

  async create(input: PermissionCreateInput) {
    const { resourceId, ...other } = input;
    const data = { ...other, resource: { connect: { id: resourceId } } };
    return await this.prisma.permission.create({
      data,
    });
  }

  async delete(id: string) {
    return await this.prisma.permission.delete({ where: { id } });
  }
}
