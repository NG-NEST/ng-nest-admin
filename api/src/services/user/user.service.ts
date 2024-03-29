import { BaseSelect, EncryptService, PrismaService } from '@api/core';
import { Injectable } from '@nestjs/common';
import { UserPaginationInput } from './pagination.input';
import { User } from './user.model';
import { UserUpdateInput } from './update.input';
import { UserCreateInput } from './create.input';
import { UserResetPasswordInput } from './reset-password.input';
import { UserSelectInput } from './select.input';
import { UserPaginationOutput } from './user.output';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private encrypt: EncryptService,
  ) {}

  async users(input: UserPaginationInput, select: BaseSelect): Promise<UserPaginationOutput> {
    const { where } = input;
    return {
      data: await this.prisma.user.findMany({ ...input, ...select }),
      count: await this.prisma.user.count({ where }),
    };
  }

  async userSelect(input: UserSelectInput, select: BaseSelect): Promise<User[]> {
    return await this.prisma.user.findMany({ ...input, ...select });
  }

  async user(id: string, select: BaseSelect): Promise<User> {
    return await this.prisma.user.findUnique({ where: { id }, ...select });
  }

  async update(input: UserUpdateInput) {
    const { id, roleIds, ...data } = input;

    const deleteRoles = this.prisma.usersOnRoles.deleteMany({ where: { userId: id } });
    const updateUser = this.prisma.user.update({
      data: { ...data, roles: { create: roleIds.map((y) => ({ roleId: y })) } },
      where: { id },
      select: { id: true },
    });

    return await this.prisma.$transaction([deleteRoles, updateUser]);
  }

  async create(input: UserCreateInput) {
    const { roleIds, ...data } = input;
    data.password = this.encrypt.hash(data.password);
    const roles = roleIds ? { create: roleIds.map((y) => ({ roleId: y })) } : undefined;

    const user = await this.prisma.user.create({
      data: { ...data, roles },
    });

    delete user.password;
    return user;
  }

  async delete(id: string) {
    return await this.prisma.user.delete({ where: { id } });
  }

  async resetPassword(id: string, data: UserResetPasswordInput) {
    data.password = this.encrypt.hash(data.password);
    return await this.prisma.user.update({
      data,
      where: { id },
      select: { id: true },
    });
  }
}
