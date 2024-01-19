import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { BaseStringFilter, BaseWhereInput, StringFilter } from '@api/core';
import { RoleDescription } from './role.enum';

@InputType()
export class RoleWhere {
  @Field(() => BaseStringFilter, { description: RoleDescription.Name, nullable: true })
  @IsOptional()
  name?: StringFilter;

  @Field(() => BaseStringFilter, { description: RoleDescription.Description, nullable: true })
  @IsOptional()
  description?: StringFilter;
}

@InputType()
export class RoleWhereInput extends BaseWhereInput(RoleWhere) {}
