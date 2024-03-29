import { Args, Query, Resolver } from '@nestjs/graphql';
import { BaseSelect, CacheControl, PrismaSelect } from '@api/core';
import {
  User,
  UserCache,
  UserId,
  UserPaginationInput,
  UserPaginationOutput,
  UserResolverName,
  UserSelectInput,
  UserSelectOutput,
  UserService,
} from '@api/services';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => UserPaginationOutput, { description: UserResolverName.Users })
  @CacheControl(UserCache.Users)
  async users(
    @Args() input: UserPaginationInput,
    @PrismaSelect('data') select: BaseSelect,
  ): Promise<UserPaginationOutput> {
    return await this.userService.users(input, select);
  }

  @Query(() => User, { description: UserResolverName.User })
  @CacheControl(UserCache.User)
  async user(@Args('id', UserId) id: string, @PrismaSelect() select: BaseSelect): Promise<User> {
    return await this.userService.user(id, select);
  }

  @Query(() => [UserSelectOutput], { description: UserResolverName.UserSelect })
  @CacheControl(UserCache.UserSelect)
  async userSelect(
    @Args() input: UserSelectInput,
    @PrismaSelect('data') select: BaseSelect,
  ): Promise<UserSelectOutput[]> {
    return await this.userService.userSelect(input, select);
  }
}
