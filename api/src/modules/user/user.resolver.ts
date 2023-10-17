import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BaseID, BaseSelect, PrismaSelect } from '@api/core';
import { CreateUserInput, UpdateUserInput, UserPaginationInput, UserPaginationOutput, UserSelectOutput } from './dto';
import { UserService } from './user.service';
import { User } from './model';
import { UserResolverName } from './enum';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => UserPaginationOutput, { description: UserResolverName.Users })
  async users(@Args() input: UserPaginationInput, @PrismaSelect('data') select: BaseSelect): Promise<UserPaginationOutput> {
    return await this.userService.users(input, select);
  }

  @Query(() => User, { description: UserResolverName.User, nullable: true })
  async user(@Args('id', BaseID) id: string, @PrismaSelect('data') select: BaseSelect): Promise<User> {
    return await this.userService.user(id, select);
  }

  @Query(() => [UserSelectOutput], { description: UserResolverName.UserSelect })
  async userSelect(@PrismaSelect('data') select: BaseSelect): Promise<UserSelectOutput[]> {
    return await this.userService.userSelect(select);
  }

  @Mutation(() => User, { description: UserResolverName.UpdateUser })
  async updateUser(@Args('id', BaseID) id: string, @Args('user') data: UpdateUserInput) {
    return await this.userService.updateUser(id, data);
  }

  @Mutation(() => User, { description: UserResolverName.CreateUser })
  async createUser(@Args('user') data: CreateUserInput) {
    return await this.userService.createUser(data);
  }

  @Mutation(() => User, { description: UserResolverName.DeleteUser })
  async deleteUser(@Args('id', BaseID) id: string) {
    return await this.userService.deleteUser(id);
  }
}
