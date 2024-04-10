import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import {
  BASE_DATETIME_FILTER,
  BaseDescription,
  BASE_STRING_FILTER,
  BaseWhereInput,
  DateTimeFilter,
  StringFilter
} from '@api/core';
import { UserDescription } from './user.enum';

@InputType()
export class UserWhere {
  @Field(() => BASE_STRING_FILTER, { description: UserDescription.Name, nullable: true })
  @IsOptional()
  name?: StringFilter;

  @Field(() => BASE_STRING_FILTER, { description: UserDescription.Account, nullable: true })
  @IsOptional()
  account?: StringFilter;

  @Field(() => BASE_STRING_FILTER, { description: UserDescription.Email, nullable: true })
  @IsOptional()
  email?: StringFilter;

  @Field(() => BASE_STRING_FILTER, { description: UserDescription.Phone, nullable: true })
  @IsOptional()
  phone?: StringFilter;

  @Field(() => BASE_DATETIME_FILTER, { description: BaseDescription.CreatedAt, nullable: true })
  @IsOptional()
  createdAt?: DateTimeFilter;

  @Field(() => BASE_DATETIME_FILTER, { description: BaseDescription.UpdatedAt, nullable: true })
  @IsOptional()
  updatedAt?: DateTimeFilter;
}

@InputType()
export class UserWhereInput extends BaseWhereInput(UserWhere) {}
