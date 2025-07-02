import { Field, ID, ObjectType } from '@nestjs/graphql';
import { VariableCategoryDescription } from './variable-category.enum';
import { BaseAudit } from '@api/core';
import { IsOptional } from 'class-validator';

@ObjectType()
export class VariableCategorySelectOutput extends BaseAudit {
  @Field(() => ID, { description: VariableCategoryDescription.Id })
  id: string;

  @Field({ description: VariableCategoryDescription.Name })
  name: string;

  @Field(() => String, { description: VariableCategoryDescription.Code })
  code: string;

  @Field({ description: VariableCategoryDescription.Sort, nullable: true })
  @IsOptional()
  sort?: number;

  @Field({ description: VariableCategoryDescription.Description, nullable: true })
  @IsOptional()
  description?: string;
}
