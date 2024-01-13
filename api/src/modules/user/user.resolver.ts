import { Args, Query, Resolver } from '@nestjs/graphql';
import { BaseID, BaseSelect, PrismaSelect } from '@api/core';
import { UserPaginationInput, UserPaginationOutput, UserSelectOutput } from './dto';
import { UserService } from './user.service';
import { User } from './model';
import { UserResolverName } from './enum';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth';

@UseGuards(GqlAuthGuard)
@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => UserPaginationOutput, { description: UserResolverName.Users })
  async users(@Args() input: UserPaginationInput, @PrismaSelect('data') select: BaseSelect): Promise<UserPaginationOutput> {
    return await this.userService.users(input, select);
  }

  @Query(() => User, { description: UserResolverName.User, nullable: true })
  async user(@Args('id', BaseID) id: string, @PrismaSelect() select: BaseSelect): Promise<User> {
    return await this.userService.user(id, select);
  }

  @Query(() => [UserSelectOutput], { description: UserResolverName.UserSelect })
  async userSelect(@PrismaSelect('data') select: BaseSelect): Promise<UserSelectOutput[]> {
    return await this.userService.userSelect(select);
  }
}
