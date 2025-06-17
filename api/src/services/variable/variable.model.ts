import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseAudit } from '@api/core';
import { IsOptional } from 'class-validator';
import { VariableDescription } from './variable.enum';
import { Resource, ResourceDescription } from '../resource';
import { VariableCategory, VariableCategoryDescription } from '../variable-category';

@ObjectType()
export class Variable extends BaseAudit {
  @Field(() => ID, { description: VariableDescription.Id })
  id: string;

  @Field({ description: VariableDescription.Code })
  code: string;

  @Field({ description: VariableDescription.Type, nullable: true })
  @IsOptional()
  type?: string;

  @Field({ description: VariableDescription.Value, nullable: true })
  @IsOptional()
  value?: string;

  @Field({ description: VariableDescription.Description, nullable: true })
  @IsOptional()
  description?: string;

  @Field({ description: ResourceDescription.Id })
  resourceId: string;

  @Field(() => Resource, { description: ResourceDescription.Resource })
  resource: Resource;

  @Field({ description: VariableCategoryDescription.Id })
  variableCategoryId: string;

  @Field(() => VariableCategory, { description: VariableCategoryDescription.VariableCategory })
  variableCategory: VariableCategory;
}
