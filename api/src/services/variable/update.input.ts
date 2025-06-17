import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ValidatorDescription, I18N } from '@api/core';
import { VariableDescription, VARIABLE_I18N } from './variable.enum';

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

  @Field({ description: VariableDescription.Value, nullable: true })
  @IsOptional()
  value?: string;

  @Field({ description: VariableDescription.Description, nullable: true })
  @IsOptional()
  description?: string;
}
