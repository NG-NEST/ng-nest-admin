import { BaseSelect, PrismaService } from '@api/core';
import { Injectable } from '@nestjs/common';
import { PermissionPaginationInput } from './pagination.input';
import { PermissionCreateInput } from './create.input';
import { PermissionUpdateInput } from './update.input';
import { Permission } from './permission.model';
import { PermissionSelectInput } from './select.input';
import { PermissionSaveManyInput } from './save-many.input';

@Injectable()
export class PermissionService {
  constructor(private prisma: PrismaService) {}

  async permissions(input: PermissionPaginationInput, select: BaseSelect) {
    const { where } = input;
    return {
      data: (await this.prisma.permission.findMany({ ...input, ...select })) as Permission[],
      count: await this.prisma.permission.count({ where }),
    };

    this.prisma.resource.findMany({
      where: {
        id: { in: ['1'] },
      },
      orderBy: [{ sort: 'asc' }, {}],
      include: {
        permissions: {
          orderBy: {
            sort: 'asc',
          },
        },
      },
    });
  }

  async permissionSelect(input: PermissionSelectInput, select: BaseSelect) {
    return await this.prisma.permission.findMany({ ...input, ...select });
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

  async saveMany(input: PermissionSaveManyInput) {
    const { many, resourceId } = input;
    const currentMany = await this.prisma.permission.findMany({
      where: { resourceId: resourceId },
    });
    let transaction = [];
    const updateMany = many.filter((x) => x.id);
    for (let data of updateMany) {
      transaction.push(this.prisma.permission.update({ data, where: { id: data.id } }));
    }
    const deleteMany = currentMany.filter((x) => !updateMany.map((y) => y.id).includes(x.id));
    if (deleteMany.length > 0) {
      transaction.push(
        this.prisma.permission.deleteMany({ where: { id: { in: deleteMany.map((x) => x.id) } } }),
      );
    }
    const createMany = many
      .filter((x) => !x.id)
      .map((x) => {
        const { id, ...data } = x;
        return data;
      });
    for (let data of createMany) {
      transaction.push(this.prisma.permission.create({ data }));
    }

    return await this.prisma.$transaction(transaction);
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
