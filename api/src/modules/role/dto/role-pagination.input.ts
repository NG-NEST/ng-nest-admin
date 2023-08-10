import { BaseOrder, BasePaginationInput, BaseWhere, SortOrder } from '@api/core';
import { InputType, Field, ArgsType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { RoleDescription } from './role.enum';
import { RoleWhere } from './role-where';

@InputType()
export class RoleOrderInput extends BaseOrder {
  @Field(() => SortOrder, { description: RoleDescription.Name, nullable: true })
  @IsOptional()
  name?: SortOrder;

  @Field(() => SortOrder, { description: RoleDescription.Code, nullable: true })
  @IsOptional()
  code?: SortOrder;
}

@InputType()
export class RoleWhereInput extends BaseWhere(RoleWhere) {}

@InputType()
export class RoleIncludeInput {
  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  users?: boolean;
}

@ArgsType()
export class RolePaginationInput extends BasePaginationInput(RoleWhereInput, RoleOrderInput, RoleIncludeInput) {}
