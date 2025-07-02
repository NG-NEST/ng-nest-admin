import { Field, ID, ObjectType } from '@nestjs/graphql';
import { VariableDescription } from './variable.enum';
import { BaseAudit } from '@api/core';
import { IsJSON, IsOptional } from 'class-validator';
import { Resource, ResourceDescription } from '../resource';
import { VariableCategory, VariableCategoryDescription } from '../variable-category';
import { GraphQLJSON } from 'graphql-scalars';
import { JsonValue } from '@prisma/client/runtime/library';

@ObjectType()
export class VariableSelectOutput extends BaseAudit {
  @Field(() => ID, { description: VariableDescription.Id })
  id: string;

  @Field({ description: VariableDescription.Code })
  code: string;

  @Field({ description: VariableDescription.Type, nullable: true })
  @IsOptional()
  type?: string;

  @Field({ description: VariableDescription.Sort, nullable: true })
  @IsOptional()
  sort?: number;

  @Field(() => GraphQLJSON, { description: VariableDescription.Value, nullable: true })
  @IsOptional()
  @IsJSON()
  value?: JsonValue;

  @Field({ description: VariableDescription.Description, nullable: true })
  @IsOptional()
  description?: string;

  @Field({ description: ResourceDescription.Id, nullable: true })
  @IsOptional()
  resourceId?: string;

  @Field(() => Resource, { description: ResourceDescription.Resource, nullable: true })
  @IsOptional()
  resource?: Resource;

  @Field({ description: VariableCategoryDescription.Id, nullable: true })
  @IsOptional()
  variableCategoryId?: string;

  @Field(() => VariableCategory, {
    description: VariableCategoryDescription.VariableCategory,
    nullable: true,
  })
  @IsOptional()
  variableCategory?: VariableCategory;
}
