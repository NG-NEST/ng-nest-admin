import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { RoleDescription } from './role.enum';
import { BaseStringFilter, StringFilter } from '@api/core';

@InputType()
export class RoleWhere {
  @Field(() => BaseStringFilter, { description: RoleDescription.Name, nullable: true })
  @IsOptional()
  name?: StringFilter;

  @Field(() => BaseStringFilter, { description: RoleDescription.Code, nullable: true })
  @IsOptional()
  code?: StringFilter;
}