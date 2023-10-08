import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { RoleDescription } from '../enum';
import { BaseStringFilter, BaseWhereInput, StringFilter } from '@api/core';

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
