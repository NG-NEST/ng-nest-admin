import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ValidatorDescription, I18N } from '@api/core';
import { ModelDescription, MODEL_I18N } from './model.enum';

@InputType()
export class ModelUpdateInput {
  @Field(() => ID, { description: ModelDescription.Id })
  @IsNotEmpty({
    message: I18N(`${MODEL_I18N}.${ModelDescription.Id}${ValidatorDescription.IsNotEmpty}`),
  })
  id: string;

  @Field(() => String, { description: ModelDescription.Name, nullable: true })
  @IsOptional()
  name?: string;

  @Field(() => String, { description: ModelDescription.Code, nullable: true })
  @IsOptional()
  code?: string;

  @Field(() => String, { description: ModelDescription.Platform, nullable: true })
  @IsOptional()
  platform?: string;

  @Field(() => String, { description: ModelDescription.Description, nullable: true })
  @IsOptional()
  description?: string;
}
