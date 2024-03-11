import { Field, InputType } from '@nestjs/graphql';
import { CacheDescription, CacheI18n } from './cache.enum';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ValidatorDescription, i18n } from '@api/core';

@InputType()
export class UpdateCacheInput {
  @Field(() => String, { description: CacheDescription.Key })
  @IsNotEmpty({
    message: i18n(`${CacheI18n}.${CacheDescription.Key}${ValidatorDescription.IsNotEmpty}`),
  })
  key: string;

  @Field(() => String, { description: CacheDescription.Value, nullable: true })
  @IsOptional()
  value?: string;

  @Field(() => String, { description: CacheDescription.Expiretime, nullable: true })
  @IsOptional()
  expiretime?: string;
}
