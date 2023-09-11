import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Auth } from './model';
import { LoginInput } from './dto';
import { AuthService } from './auth.service';
import { AuthResolverName } from './enum';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private auth: AuthService) {}

  @Mutation(() => Auth, { description: AuthResolverName.Login })
  async login(@Args() login: LoginInput) {
    return await this.auth.login(login);
  }
}
