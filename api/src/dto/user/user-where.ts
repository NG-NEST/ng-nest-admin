import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import {
  BaseDateTimeFilter,
  BaseDescription,
  BaseStringFilter,
  BaseWhereInput,
  DateTimeFilter,
  StringFilter
} from '@api/core';
import { UserDescription } from './user.enum';

@InputType()
export class UserWhere {
  @Field(() => BaseStringFilter, { description: UserDescription.Name, nullable: true })
  @IsOptional()
  name?: StringFilter;

  @Field(() => BaseStringFilter, { description: UserDescription.Account, nullable: true })
  @IsOptional()
  account?: StringFilter;

  @Field(() => BaseStringFilter, { description: UserDescription.Email, nullable: true })
  @IsOptional()
  email?: StringFilter;

  @Field(() => BaseStringFilter, { description: UserDescription.Phone, nullable: true })
  @IsOptional()
  phone?: StringFilter;

  @Field(() => BaseDateTimeFilter, { description: BaseDescription.CreatedAt, nullable: true })
  @IsOptional()
  createdAt?: DateTimeFilter;

  @Field(() => BaseDateTimeFilter, { description: BaseDescription.UpdatedAt, nullable: true })
  @IsOptional()
  updatedAt?: DateTimeFilter;
}

@InputType()
export class UserWhereInput extends BaseWhereInput(UserWhere) {}
