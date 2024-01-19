import { BaseSelect, EncryptService, PrismaService } from '@api/core';
import { Injectable } from '@nestjs/common';
import {
  User,
  CreateUserInput,
  ResetPasswordInput,
  UpdateUserInput,
  UserPaginationInput
} from '@api/dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private encrypt: EncryptService) {}

  async users(input: UserPaginationInput, select: BaseSelect) {
    const { where } = input;
    return {
      data: (await this.prisma.user.findMany({ ...input, ...select })) as User[],
      count: await this.prisma.user.count({ where })
    };
  }

  async userSelect(select: BaseSelect) {
    return await this.prisma.user.findMany({ ...select });
  }

  async user(id: string, select: BaseSelect) {
    return (await this.prisma.user.findUnique({ where: { id }, ...select })) as User;
  }

  async updateUser(input: UpdateUserInput) {
    const { id, roleIds, ...data } = input;

    const deleteRoles = this.prisma.usersOnRoles.deleteMany({ where: { userId: id } });
    const updateUser = this.prisma.user.update({
      data: { ...data, roles: { create: roleIds.map((y) => ({ roleId: y })) } },
      where: { id },
      select: { id: true }
    });

    return await this.prisma.$transaction([deleteRoles, updateUser]);
  }

  async createUser(input: CreateUserInput) {
    const { roleIds, ...data } = input;
    data.password = this.encrypt.hash(data.password);
    return await this.prisma.user.create({
      data: { ...data, roles: { create: roleIds.map((y) => ({ roleId: y })) } }
    });
  }

  async deleteUser(id: string) {
    return await this.prisma.user.delete({ where: { id } });
  }

  async resetPassword(id: string, data: ResetPasswordInput) {
    data.password = this.encrypt.hash(data.password);
    return await this.prisma.user.update({
      data,
      where: { id },
      select: { id: true }
    });
  }
}
