import { BaseOrder, SortOrder } from '@api/core';
import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { VariableDescription } from './variable.enum';
import { ResourceDescription, ResourceOrderInput } from '../resource';
import { VariableCategoryDescription, VariableCategoryOrderInput } from '../variable-category';

@InputType()
export class VariableOrderInput extends BaseOrder {
  @Field(() => SortOrder, { description: VariableDescription.Code, nullable: true })
  @IsOptional()
  code?: SortOrder;

  @Field(() => SortOrder, { description: VariableDescription.Type, nullable: true })
  @IsOptional()
  type?: SortOrder;

  @Field(() => SortOrder, { description: ResourceDescription.Id, nullable: true })
  @IsOptional()
  resourceId?: SortOrder;

  @Field(() => SortOrder, { description: ResourceDescription.Resource, nullable: true })
  @IsOptional()
  resource?: ResourceOrderInput;

  @Field(() => SortOrder, { description: VariableCategoryDescription.Id, nullable: true })
  @IsOptional()
  variableCategoryId?: SortOrder;

  @Field(() => SortOrder, {
    description: VariableCategoryDescription.VariableCategory,
    nullable: true,
  })
  @IsOptional()
  variableCategory?: VariableCategoryOrderInput;
}
