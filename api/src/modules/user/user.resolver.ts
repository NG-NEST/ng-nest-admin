import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BaseDescription, BaseID, PrismaService } from '@api/core';
import { UpdateUserInput } from './dto/update.input';
import { User } from './dto/user.model';
import { CreateUserInput } from './dto/create.input';
import { UserPaginationOutput } from './dto/user.output';
import { UserPaginationInput } from './dto/user-pagination.input';
import { UserResolverName } from './dto/user.enum';

@Resolver(() => User)
export class UserResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => UserPaginationOutput, { description: UserResolverName.Users })
  async users(@Args() { skip, take, orderBy, where }: UserPaginationInput): Promise<UserPaginationOutput> {
    return {
      data: await this.prisma.user.findMany({ skip, take, orderBy, where }),
      count: await this.prisma.user.count({ where })
    };
  }

  @Query(() => User, { description: UserResolverName.User, nullable: true })
  async user(@Args('id', BaseID) id: string): Promise<User> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  @Mutation(() => User, { description: UserResolverName.UpdateUser })
  async updateUser(@Args('id', BaseID) id: string, @Args('updateUser') data: UpdateUserInput) {
    return await this.prisma.user.update({
      data,
      where: { id }
    });
  }

  @Mutation(() => User, { description: UserResolverName.CreateUser })
  async createUser(@Args('createUser') data: CreateUserInput) {
    return await this.prisma.user.create({ data });
  }

  @Mutation(() => User, { description: UserResolverName.DeleteUser })
  async deleteUser(@Args('id', BaseID) id: string) {
    return await this.prisma.user.delete({ where: { id } });
  }
}
