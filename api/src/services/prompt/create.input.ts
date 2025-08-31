import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ValidatorDescription, I18N, IsNotExist } from '@api/core';
import { GraphQLJSON } from 'graphql-scalars';
import { PromptDescription, PROMPT_I18N } from './prompt.enum';
import { JsonValue } from '@prisma/client/runtime/library';
import { MODEL_I18N, ModelDescription } from '../model';

@InputType()
export class PromptCreateInput {
  @Field(() => String, { description: PromptDescription.Name })
  @IsNotEmpty({
    message: I18N(`${PROMPT_I18N}.${PromptDescription.Name}${ValidatorDescription.IsNotEmpty}`),
  })
  name: string;

  @Field(() => String, { description: PromptDescription.User })
  @IsNotEmpty({
    message: I18N(`${PROMPT_I18N}.${PromptDescription.User}${ValidatorDescription.IsNotEmpty}`),
  })
  user: string;

  @Field(() => String, { description: PromptDescription.System, nullable: true })
  @IsOptional()
  system?: string;

  @Field(() => String, { description: PromptDescription.ModelId })
  @IsNotEmpty({
    message: I18N(`${PROMPT_I18N}.${PromptDescription.ModelId}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsNotExist('model', {
    message: I18N(`${MODEL_I18N}.${ModelDescription.Id}${ValidatorDescription.IsNotExist}`),
    context: { relation: 'id' },
  })
  modelId: string;

  @Field(() => GraphQLJSON, { description: PromptDescription.UserVars, nullable: true })
  @IsOptional()
  userVars?: JsonValue;

  @Field(() => String, { description: PromptDescription.Description, nullable: true })
  @IsOptional()
  description?: string;
}
