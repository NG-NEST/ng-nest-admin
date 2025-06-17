import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseAudit } from '@api/core';
import { IsOptional } from 'class-validator';
import { VariableCategoryDescription } from './variable-category.enum';
import { Resource, ResourceDescription } from '../resource';

@ObjectType()
export class VariableCategory extends BaseAudit {
  @Field(() => ID, { description: VariableCategoryDescription.Id })
  id: string;

  @Field({ description: VariableCategoryDescription.Name })
  name: string;

  @Field({ description: VariableCategoryDescription.Code })
  code: string;

  @Field({ description: VariableCategoryDescription.Description, nullable: true })
  @IsOptional()
  description?: string;

  @Field({ description: ResourceDescription.Id })
  resourceId: string;

  @Field(() => Resource, { description: ResourceDescription.Resource })
  resource: Resource;
}
