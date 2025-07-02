import { BaseOrder, SortOrder } from '@api/core';
import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { VariableCategoryDescription } from './variable-category.enum';
import { ResourceDescription, ResourceOrderInput } from '../resource';

@InputType()
export class VariableCategoryOrderInput extends BaseOrder {
  @Field(() => SortOrder, { description: VariableCategoryDescription.Name, nullable: true })
  @IsOptional()
  name?: SortOrder;

  @Field(() => SortOrder, { description: VariableCategoryDescription.Code, nullable: true })
  @IsOptional()
  code?: SortOrder;

  @Field(() => SortOrder, { description: VariableCategoryDescription.Sort, nullable: true })
  @IsOptional()
  sort?: SortOrder;

  @Field(() => SortOrder, { description: ResourceDescription.Id, nullable: true })
  @IsOptional()
  resourceId?: SortOrder;

  @Field(() => SortOrder, { description: ResourceDescription.Resource, nullable: true })
  @IsOptional()
  resource?: ResourceOrderInput;
}
