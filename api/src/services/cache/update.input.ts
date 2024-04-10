import { Field, InputType } from '@nestjs/graphql';
import { CacheDescription, CACHE_I18N } from './cache.enum';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ValidatorDescription, I18N } from '@api/core';

@InputType()
export class CacheUpdateInput {
  @Field(() => String, { description: CacheDescription.Key })
  @IsNotEmpty({
    message: I18N(`${CACHE_I18N}.${CacheDescription.Key}${ValidatorDescription.IsNotEmpty}`),
  })
  key: string;

  @Field(() => String, { description: CacheDescription.Value, nullable: true })
  @IsOptional()
  value?: string;

  @Field(() => String, { description: CacheDescription.Expiretime, nullable: true })
  @IsOptional()
  expiretime?: string;
}
