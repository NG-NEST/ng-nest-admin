import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { BaseSelect, GqlCurrentUser, PrismaSelect } from '@api/core';
import { UseGuards } from '@nestjs/common';
import {
  Auth,
  AuthResolverName,
  AuthService,
  GqlAuthGuard,
  RefreshTokenInput,
  User
} from '@api/services';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private auth: AuthService) {}

  @Mutation(() => Auth, { description: AuthResolverName.RefreshToken })
  refreshToken(@Args() { refreshToken }: RefreshTokenInput) {
    return this.auth.refreshToken(refreshToken);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { description: AuthResolverName.User })
  async userInfo(@GqlCurrentUser() user: User, @PrismaSelect() select: BaseSelect) {
    return await this.auth.getUserFromToken(user.id, select);
  }
}
