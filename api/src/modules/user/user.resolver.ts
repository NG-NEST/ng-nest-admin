import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BaseID, PrismaSelect, PrismaService } from '@api/core';
import { CreateUserInput, UpdateUserInput, User, UserPaginationInput, UserPaginationOutput, UserResolverName } from './dto';
import { GetUserSelect } from './dto/user-select';

@Resolver(() => User)
export class UserResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => UserPaginationOutput, { description: UserResolverName.Users })
  async users(@Args() input: UserPaginationInput, @PrismaSelect('data') select: GetUserSelect): Promise<UserPaginationOutput> {
    const { where } = input;
    return {
      data: (await this.prisma.user.findMany({ ...input, ...select })) as User[],
      count: await this.prisma.user.count({ where })
    };
  }

  @Query(() => User, { description: UserResolverName.User, nullable: true })
  async user(@Args('id', BaseID) id: string, @PrismaSelect('data') select: GetUserSelect): Promise<User> {
    return (await this.prisma.user.findUnique({ where: { id }, ...select })) as User;
  }

  @Mutation(() => User, { description: UserResolverName.UpdateUser })
  async updateUser(@Args('id', BaseID) id: string, @Args('user') data: UpdateUserInput) {
    return await this.prisma.user.update({
      data,
      where: { id }
    });
  }

  @Mutation(() => User, { description: UserResolverName.CreateUser })
  async createUser(@Args('user') data: CreateUserInput) {
    return await this.prisma.user.create({ data });
  }

  @Mutation(() => User, { description: UserResolverName.DeleteUser })
  async deleteUser(@Args('id', BaseID) id: string) {
    return await this.prisma.user.delete({ where: { id } });
  }
}
