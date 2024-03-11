import { Field, ObjectType } from '@nestjs/graphql';
import { CacheDescription } from './cache.enum';

@ObjectType()
export class Cache {
  @Field(() => String, { description: CacheDescription.Key })
  key: string;

  @Field(() => String, { description: CacheDescription.Value })
  value: string;

  @Field(() => String, { description: CacheDescription.Expiretime })
  expiretime: string;
}
