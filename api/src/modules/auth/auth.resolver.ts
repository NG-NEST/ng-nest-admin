import { Args, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Auth } from './model';
import { LoginInput, RefreshTokenInput } from './dto';
import { AuthService } from './auth.service';
import { AuthResolverName } from './enum';
// import { User } from '@api/modules';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private auth: AuthService) {}

  @Mutation(() => Auth, { description: AuthResolverName.Login })
  async login(@Args('login') login: LoginInput) {
    return await this.auth.login(login);
  }

  @Mutation(() => Auth, { description: AuthResolverName.RefreshToken })
  refreshToken(@Args() { token }: RefreshTokenInput) {
    return this.auth.refreshToken(token);
  }
}
