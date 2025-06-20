import { Field, ID, InputType } from '@nestjs/graphql';
import { IsJSON, IsNotEmpty, IsOptional } from 'class-validator';
import { ValidatorDescription, I18N } from '@api/core';
import { VariableDescription, VARIABLE_I18N } from './variable.enum';
import { GraphQLJSON } from 'graphql-scalars';
import { JsonValue } from '@prisma/client/runtime/library';

@InputType()
export class VariableUpdateInput {
  @Field(() => ID, { description: VariableDescription.Id })
  @IsNotEmpty({
    message: I18N(`${VARIABLE_I18N}.${VariableDescription.Id}${ValidatorDescription.IsNotEmpty}`),
  })
  id: string;

  @Field({ description: VariableDescription.Code })
  code: string;

  @Field(() => String, { description: VariableDescription.Type, nullable: true })
  @IsOptional()
  type?: string;

  @Field(() => GraphQLJSON, { description: VariableDescription.Value, nullable: true })
  @IsOptional()
  @IsJSON()
  value?: JsonValue;

  @Field({ description: VariableDescription.Description, nullable: true })
  @IsOptional()
  description?: string;
}
