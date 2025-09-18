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

  @Field(() => String, { description: PromptDescription.Prompt })
  @IsNotEmpty({
    message: I18N(`${PROMPT_I18N}.${PromptDescription.Prompt}${ValidatorDescription.IsNotEmpty}`),
  })
  prompt: string;

  @Field(() => String, { description: PromptDescription.System, nullable: true })
  @IsOptional()
  system?: string;

  @Field(() => String, { description: PromptDescription.Code })
  @IsNotEmpty({
    message: I18N(`${PROMPT_I18N}.${PromptDescription.Code}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsNotExist('model', {
    message: I18N(`${MODEL_I18N}.${ModelDescription.Code}${ValidatorDescription.IsNotExist}`),
    context: { relation: 'code' },
  })
  code: string;

  @Field(() => String, { description: PromptDescription.Platform })
  @IsNotEmpty({
    message: I18N(`${PROMPT_I18N}.${PromptDescription.Platform}${ValidatorDescription.IsNotEmpty}`),
  })
  platform: string;

  @Field(() => GraphQLJSON, { description: PromptDescription.PromptVars, nullable: true })
  @IsOptional()
  promptVars?: JsonValue;

  @Field(() => String, { description: PromptDescription.Description, nullable: true })
  @IsOptional()
  description?: string;
}
