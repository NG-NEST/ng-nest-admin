import { BaseSelect, PrismaService } from '@api/core';
import { Injectable } from '@nestjs/common';
import { CreateUserInput, UpdateUserInput, User, UserPaginationInput } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async users(input: UserPaginationInput, select: BaseSelect) {
    const { where } = input;
    return {
      data: (await this.prisma.user.findMany({ ...input, ...select })) as User[],
      count: await this.prisma.user.count({ where })
    };
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
    this.prisma.user.findFirst();
    return await this.prisma.user.create({ data });
  }

  async deleteUser(id: string) {
    return await this.prisma.user.delete({ where: { id } });
  }
}
