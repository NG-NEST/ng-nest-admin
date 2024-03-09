import { BaseSelect, PrismaService, RedisService } from '@api/core';
import { Injectable } from '@nestjs/common';
import { RolePaginationInput } from './role-pagination.input';
import { Role } from './role.model';
import { UpdateRoleInput } from './update.input';
import { CreateRoleInput } from './create.input';

@Injectable()
export class RoleService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
  ) {}

  async roles(input: RolePaginationInput, select: BaseSelect) {
    const { where } = input;
    return {
      data: (await this.prisma.role.findMany({ ...input, ...select })) as Role[],
      count: await this.prisma.role.count({ where }),
    };
  }

  async roleSelect(select: BaseSelect) {
    const key = 'select-roles';
    const dt = JSON.parse(await this.redis.get(key)) as Role[];
    if (dt) {
      return dt;
    }
    const data = await this.prisma.role.findMany({ ...select });
    await this.redis.set(key, JSON.stringify(data), 'EX', 5);

    return data;
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

  async updateRole(input: UpdateRoleInput) {
    const { id, ...data } = input;
    return await this.prisma.role.update({
      data,
      where: { id },
    });
  }

  async createRole(data: CreateRoleInput) {
    return await this.prisma.role.create({ data });
  }

  async deleteRole(id: string) {
    return await this.prisma.role.delete({ where: { id } });
  }

  async createRolePermissions(roleId: string, permissionIds: string[]) {
    const deleteRolePermissions = this.prisma.rolesOnPermissions.deleteMany({
      where: { roleId },
    });
    const createRolePermissions = this.prisma.rolesOnPermissions.createMany({
      data: permissionIds.map((permissionId) => ({ roleId, permissionId })),
    });

    return await this.prisma.$transaction([deleteRolePermissions, createRolePermissions]);
  }
}
