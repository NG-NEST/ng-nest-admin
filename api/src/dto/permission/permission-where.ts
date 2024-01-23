import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import {
  BaseNumberFilter,
  BaseStringFilter,
  BaseWhereInput,
  NumberFilter,
  StringFilter
} from '@api/core';
import { PermissionDescription } from './permission.enum';

@InputType()
export class PermissionWhere {
  @Field(() => BaseStringFilter, { description: PermissionDescription.Name, nullable: true })
  @IsOptional()
  name?: StringFilter;

  @Field(() => BaseStringFilter, { description: PermissionDescription.Code, nullable: true })
  @IsOptional()
  code?: StringFilter;

  @Field(() => BaseNumberFilter, { description: PermissionDescription.Sort, nullable: true })
  @IsOptional()
  sort?: NumberFilter;

  @Field(() => BaseStringFilter, { description: PermissionDescription.Description, nullable: true })
  @IsOptional()
  description?: StringFilter;
}

@InputType()
export class PermissionWhereInput extends BaseWhereInput(PermissionWhere) {}
