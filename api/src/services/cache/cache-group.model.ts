import { Field, ObjectType } from '@nestjs/graphql';
import { CacheDescription } from './cache.enum';

@ObjectType()
export class CacheGroup {
  @Field(() => String, { description: CacheDescription.Id })
  id: string;

  @Field(() => String, { description: CacheDescription.Type })
  type: string;

  @Field(() => [String], { description: CacheDescription.Keys })
  keys: string[];
}
