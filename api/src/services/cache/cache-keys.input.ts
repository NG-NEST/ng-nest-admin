import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { CacheDescription } from './cache.enum';

@ArgsType()
export class CacheKeysInput {
  @Field(() => String, { description: CacheDescription.Key, defaultValue: '*', nullable: true })
  @IsOptional()
  key?: string;
}
