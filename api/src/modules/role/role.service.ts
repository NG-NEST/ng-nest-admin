import { BaseSelect, EncryptService, PrismaService } from '@api/core';
import { Injectable } from '@nestjs/common';
import { CreateRoleInput, UpdateRoleInput, RolePaginationInput } from './dto';
import { Role } from './model';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService, private encrypt: EncryptService) {}

  async roles(input: RolePaginationInput, select: BaseSelect) {
    const { where } = input;
    return {
      data: (await this.prisma.role.findMany({ ...input, ...select })) as Role[],
      count: await this.prisma.role.count({ where })
    };
  }

  async role(id: string, select: BaseSelect) {
    return (await this.prisma.role.findUnique({ where: { id }, ...select })) as Role;
  }

  async updateRole(id: string, data: UpdateRoleInput) {
    return await this.prisma.role.update({
      data,
      where: { id }
    });
  }

  async createRole(data: CreateRoleInput) {
    return await this.prisma.role.create({ data });
  }

  async deleteRole(id: string) {
    return await this.prisma.role.delete({ where: { id } });
  }
}
