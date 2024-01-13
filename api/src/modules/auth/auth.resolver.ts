import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { Auth } from './model';
import { RefreshTokenInput } from './dto';
import { AuthService } from './auth.service';
import { AuthResolverName } from './enum';
import { User } from '@api/modules';
import { BaseSelect, GqlCurrentUser, PrismaSelect } from '@api/core';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guard';

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
