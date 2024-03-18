import { BaseSelect, PrismaService } from '@api/core';
import { Injectable } from '@nestjs/common';
import { RolePaginationInput } from './pagination.input';
import { Role } from './role.model';
import { RoleUpdateInput } from './update.input';
import { RoleCreateInput } from './create.input';
import { RoleSelectInput } from './select.input';
import { RolePaginationOutput } from './role.output';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async roles(input: RolePaginationInput, select: BaseSelect): Promise<RolePaginationOutput> {
    const { where } = input;
    return {
      data: await this.prisma.role.findMany({ ...input, ...select }),
      count: await this.prisma.role.count({ where }),
    };
  }

  async roleSelect(input: RoleSelectInput, select: BaseSelect): Promise<Role[]> {
    return await this.prisma.role.findMany({ ...input, ...select });
  }

  async rolePermissions(id: string, select: BaseSelect) {
    const data = await this.prisma.rolesOnPermissions.findMany({
      where: { roleId: id },
      select: { permission: { ...select } },
    });

    if (data.length > 0) {
      return data.map((x) => x.permission);
    }
    return [];
  }

  async role(id: string, select: BaseSelect) {
    return (await this.prisma.role.findUnique({ where: { id }, ...select })) as Role;
  }

  async update(input: RoleUpdateInput) {
    const { id, ...data } = input;
    return await this.prisma.role.update({
      data,
      where: { id },
    });
  }

  async create(data: RoleCreateInput) {
    return await this.prisma.role.create({ data });
  }

  async delete(id: string) {
    return await this.prisma.role.delete({ where: { id } });
  }

  async createPermissions(roleId: string, permissionIds: string[]) {
    const deleteRolePermissions = this.prisma.rolesOnPermissions.deleteMany({
      where: { roleId },
    });
    const createRolePermissions = this.prisma.rolesOnPermissions.createMany({
      data: permissionIds.map((permissionId) => ({ roleId, permissionId })),
    });

    return await this.prisma.$transaction([deleteRolePermissions, createRolePermissions]);
  }
}
