import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ValidatorDescription, I18N } from '@api/core';
import { ModelDescription, MODEL_I18N } from './model.enum';

@InputType()
export class ModelCreateInput {
  @Field(() => String, { description: ModelDescription.Name })
  @IsNotEmpty({
    message: I18N(`${MODEL_I18N}.${ModelDescription.Name}${ValidatorDescription.IsNotEmpty}`),
  })
  name: string;

  @Field(() => String, { description: ModelDescription.Type })
  @IsNotEmpty({
    message: I18N(`${MODEL_I18N}.${ModelDescription.Type}${ValidatorDescription.IsNotEmpty}`),
  })
  type: string;

  @Field(() => String, { description: ModelDescription.Description, nullable: true })
  @IsOptional()
  description?: string;
}
