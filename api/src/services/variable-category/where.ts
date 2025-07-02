import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import {
  BASE_NUMBER_FILTER,
  BASE_STRING_FILTER,
  BaseWhereInput,
  NumberFilter,
  StringFilter,
} from '@api/core';
import { VariableCategoryDescription } from './variable-category.enum';
import { ResourceDescription, ResourceWhereInput } from '../resource';

@InputType()
export class VariableCategoryWhere {
  @Field(() => BASE_STRING_FILTER, {
    description: VariableCategoryDescription.Name,
    nullable: true,
  })
  @IsOptional()
  name?: StringFilter;

  @Field(() => BASE_STRING_FILTER, {
    description: VariableCategoryDescription.Code,
    nullable: true,
  })
  @IsOptional()
  code?: StringFilter;

  @Field(() => BASE_STRING_FILTER, {
    description: VariableCategoryDescription.Description,
    nullable: true,
  })
  @IsOptional()
  description?: StringFilter;

  @Field(() => BASE_NUMBER_FILTER, {
    description: VariableCategoryDescription.Sort,
    nullable: true,
  })
  @IsOptional()
  sort?: NumberFilter;

  @Field(() => BASE_STRING_FILTER, { description: ResourceDescription.Id, nullable: true })
  @IsOptional()
  resourceId?: StringFilter;

  @Field(() => ResourceWhereInput, { description: ResourceDescription.Resource, nullable: true })
  @IsOptional()
  resource?: ResourceWhereInput;
}

@InputType()
export class VariableCategoryWhereInput extends BaseWhereInput(VariableCategoryWhere) {}
