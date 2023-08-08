import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { UserDescription } from './user.enum';
import { BaseString, StringFilter } from '@api/core';

@InputType()
export class UserWhere {
  @Field(() => BaseString, { description: UserDescription.Name, nullable: true })
  @IsOptional()
  name?: StringFilter;

  @Field({ description: UserDescription.Account, nullable: true })
  @IsOptional()
  account?: StringFilter;

  @Field({ description: UserDescription.Email, nullable: true })
  @IsOptional()
  email?: StringFilter;

  @Field({ description: UserDescription.Phone, nullable: true })
  @IsOptional()
  phone?: StringFilter;
}
