import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { IsNotExist, ValidatorDescription, I18N } from '@api/core';
import { VariableDescription, VARIABLE_I18N } from './variable.enum';
import { ResourceDescription } from '../resource';
import { VariableCategoryDescription } from '../variable-category';
import { GraphQLJSON } from 'graphql-scalars';
import { JsonValue } from '@prisma/client/runtime/library';

@InputType()
export class VariableCreateInput {
  @Field({ description: VariableDescription.Code })
  @IsNotEmpty({
    message: I18N(`${VARIABLE_I18N}.${VariableDescription.Code}${ValidatorDescription.IsNotEmpty}`),
  })
  code: string;

  @Field(() => String, { description: VariableDescription.Type, nullable: true })
  @IsOptional()
  type?: string;

  @Field(() => GraphQLJSON, { description: VariableDescription.Value, nullable: true })
  @IsOptional()
  value?: JsonValue;

  @Field(() => String, { description: VariableDescription.Source, nullable: true })
  @IsOptional()
  source?: string;

  @Field({ description: VariableDescription.Description, nullable: true })
  @IsOptional()
  description?: string;

  @Field({ description: VariableDescription.Sort, nullable: true })
  @IsOptional()
  sort?: number;

  @Field({ description: ResourceDescription.Id })
  @IsNotEmpty({
    message: I18N(`${VARIABLE_I18N}.${ResourceDescription.Id}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsNotExist('resource', {
    message: I18N(`${VARIABLE_I18N}.${ResourceDescription.Id}${ValidatorDescription.IsNotExist}`),
    context: { relation: 'id' },
  })
  resourceId: string;

  @Field({ description: VariableCategoryDescription.Id })
  @IsNotEmpty({
    message: I18N(
      `${VARIABLE_I18N}.${VariableCategoryDescription.Id}${ValidatorDescription.IsNotEmpty}`,
    ),
  })
  @IsNotExist('variableCategory', {
    message: I18N(
      `${VARIABLE_I18N}.${VariableCategoryDescription.Id}${ValidatorDescription.IsNotExist}`,
    ),
    context: { relation: 'id' },
  })
  variableCategoryId: string;
}
