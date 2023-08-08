import { BaseOrder, BasePaginationInput, BaseWhere, SortOrder } from '@api/core';
import { InputType, Field, ArgsType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { UserDescription } from './user.enum';
import { UserWhere } from './user-where';

@InputType()
export class UserOrderInput extends BaseOrder {
  @Field(() => SortOrder, { description: UserDescription.Name, nullable: true })
  @IsOptional()
  name?: SortOrder;

  @Field(() => SortOrder, { description: UserDescription.Account, nullable: true })
  @IsOptional()
  account?: SortOrder;

  @Field(() => SortOrder, { description: UserDescription.Email, nullable: true })
  @IsOptional()
  email?: SortOrder;

  @Field(() => SortOrder, { description: UserDescription.Phone, nullable: true })
  @IsOptional()
  phone?: SortOrder;
}

@InputType()
export class UserWhereInput extends BaseWhere(UserWhere) {}

@ArgsType()
export class UserPaginationInput extends BasePaginationInput(UserOrderInput, UserWhereInput) {}
