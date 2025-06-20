import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseAudit } from '@api/core';
import { IsJSON, IsOptional } from 'class-validator';
import { VariableDescription } from './variable.enum';
import { ResourceDescription } from '../resource';
import { VariableCategoryDescription } from '../variable-category';
import { JsonValue } from '@prisma/client/runtime/library';
import { GraphQLJSON } from 'graphql-scalars';

@ObjectType()
export class Variable extends BaseAudit {
  @Field(() => ID, { description: VariableDescription.Id })
  id: string;

  @Field({ description: VariableDescription.Code })
  code: string;

  @Field({ description: VariableDescription.Type, nullable: true })
  @IsOptional()
  type?: string;

  @Field(() => GraphQLJSON, { description: VariableDescription.Value, nullable: true })
  @IsOptional()
  @IsJSON()
  value?: JsonValue;

  @Field({ description: VariableDescription.Description, nullable: true })
  @IsOptional()
  description?: string;

  @Field({ description: ResourceDescription.Id })
  resourceId: string;

  @Field({ description: VariableCategoryDescription.Id })
  variableCategoryId: string;
}
