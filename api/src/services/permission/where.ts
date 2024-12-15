import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import {
  BASE_NUMBER_FILTER,
  BASE_STRING_FILTER,
  BaseWhereInput,
  NumberFilter,
  StringFilter
} from '@api/core';
import { PermissionDescription } from './permission.enum';

@InputType()
export class PermissionWhere {
  @Field(() => BASE_STRING_FILTER, { description: PermissionDescription.Name, nullable: true })
  @IsOptional()
  name?: StringFilter;

  @Field(() => BASE_STRING_FILTER, { description: PermissionDescription.Code, nullable: true })
  @IsOptional()
  code?: StringFilter;

  @Field(() => BASE_NUMBER_FILTER, { description: PermissionDescription.Sort, nullable: true })
  @IsOptional()
  sort?: NumberFilter;

  @Field(() => BASE_STRING_FILTER, { description: PermissionDescription.Description, nullable: true })
  @IsOptional()
  description?: StringFilter;

  @Field(() => BASE_STRING_FILTER, { description: PermissionDescription.ResourceId, nullable: true })
  @IsOptional()
  resourceId?: StringFilter;
}

@InputType()
export class PermissionWhereInput extends BaseWhereInput(PermissionWhere) {}
