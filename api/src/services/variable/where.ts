import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import {
  BASE_NUMBER_FILTER,
  BASE_STRING_FILTER,
  BaseWhereInput,
  NumberFilter,
  StringFilter,
} from '@api/core';
import { VariableDescription } from './variable.enum';
import { ResourceDescription, ResourceWhereInput } from '../resource';
import { VariableCategoryDescription, VariableCategoryWhereInput } from '../variable-category';

@InputType()
export class VariableWhere {
  @Field(() => BASE_STRING_FILTER, { description: VariableDescription.Code, nullable: true })
  @IsOptional()
  code?: StringFilter;

  @Field(() => BASE_STRING_FILTER, { description: VariableDescription.Type, nullable: true })
  @IsOptional()
  type?: StringFilter;

  @Field(() => BASE_STRING_FILTER, { description: VariableDescription.Value, nullable: true })
  @IsOptional()
  value?: StringFilter;

  @Field(() => BASE_NUMBER_FILTER, { description: VariableDescription.Sort, nullable: true })
  @IsOptional()
  sort?: NumberFilter;

  @Field(() => BASE_STRING_FILTER, {
    description: VariableDescription.Description,
    nullable: true,
  })
  @IsOptional()
  description?: StringFilter;

  @Field(() => BASE_STRING_FILTER, { description: ResourceDescription.Id, nullable: true })
  @IsOptional()
  resourceId?: StringFilter;

  @Field(() => ResourceWhereInput, { description: ResourceDescription.Resource, nullable: true })
  @IsOptional()
  resource?: ResourceWhereInput;

  @Field(() => BASE_STRING_FILTER, { description: VariableCategoryDescription.Id, nullable: true })
  @IsOptional()
  variableCategoryId?: StringFilter;

  @Field(() => VariableCategoryWhereInput, {
    description: VariableCategoryDescription.VariableCategory,
    nullable: true,
  })
  @IsOptional()
  variableCategory?: VariableCategoryWhereInput;
}

@InputType()
export class VariableWhereInput extends BaseWhereInput(VariableWhere) {}
