import { BaseOrder, SortOrder } from '@api/core';
import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { UserDescription } from '../enum';

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
