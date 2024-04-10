import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { BASE_STRING_FILTER, BaseWhereInput, StringFilter } from '@api/core';
import { RoleDescription } from './role.enum';

@InputType()
export class RoleWhere {
  @Field(() => BASE_STRING_FILTER, { description: RoleDescription.Name, nullable: true })
  @IsOptional()
  name?: StringFilter;

  @Field(() => BASE_STRING_FILTER, { description: RoleDescription.Description, nullable: true })
  @IsOptional()
  description?: StringFilter;
}

@InputType()
export class RoleWhereInput extends BaseWhereInput(RoleWhere) {}
