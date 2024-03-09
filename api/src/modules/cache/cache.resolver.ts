import { Resolver } from '@nestjs/graphql';
import { Auth } from '@api/services';

@Resolver(() => Auth)
export class CacheResolver {
  constructor() {}
}
