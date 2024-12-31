import { Query, Resolver } from '@nestjs/graphql';
import { BaseSelect, GqlCurrentUser, PrismaSelect } from '@api/core';
import { Auth, AuthResolverName, AuthService, User } from '@api/services';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private auth: AuthService) { }

  @Query(() => User, { description: AuthResolverName.User })
  async userInfo(@GqlCurrentUser() user: User, @PrismaSelect() select: BaseSelect) {
    return await this.auth.getUserById(user.id, select);
  }
}
