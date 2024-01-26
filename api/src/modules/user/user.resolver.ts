import { Args, Query, Resolver } from '@nestjs/graphql';
import { BaseSelect, PrismaSelect } from '@api/core';
import { UseGuards } from '@nestjs/common';
import {
  GqlAuthGuard,
  User,
  UserId,
  UserPaginationInput,
  UserPaginationOutput,
  UserResolverName,
  UserSelectOutput,
  UserService
} from '@api/services';

@UseGuards(GqlAuthGuard)
@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => UserPaginationOutput, { description: UserResolverName.Users })
  async users(
    @Args() input: UserPaginationInput,
    @PrismaSelect('data') select: BaseSelect
  ): Promise<UserPaginationOutput> {
    return await this.userService.users(input, select);
  }

  @Query(() => User, { description: UserResolverName.User })
  async user(@Args('id', UserId) id: string, @PrismaSelect() select: BaseSelect): Promise<User> {
    return await this.userService.user(id, select);
  }

  @Query(() => [UserSelectOutput], { description: UserResolverName.UserSelect })
  async userSelect(@PrismaSelect('data') select: BaseSelect): Promise<UserSelectOutput[]> {
    return await this.userService.userSelect(select);
  }
}
