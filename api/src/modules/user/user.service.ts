import { BaseSelect, EncryptService, PrismaService } from '@api/core';
import { Injectable } from '@nestjs/common';
import { CreateUserInput, UpdateUserInput, UserPaginationInput } from './dto';
import { User } from './model';

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

  async updateUser(id: string, data: UpdateUserInput) {
    return await this.prisma.user.update({
      data,
      where: { id }
    });
  }

  async createUser(data: CreateUserInput) {
    data.password = this.encrypt.hash(data.password);
    return await this.prisma.user.create({ data });
  }

  async deleteUser(id: string) {
    return await this.prisma.user.delete({ where: { id } });
  }
}
