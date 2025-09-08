import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ValidatorDescription, I18N } from '@api/core';
import { GraphQLJSON } from 'graphql-scalars';
import { PromptDescription, PROMPT_I18N } from './prompt.enum';
import { JsonValue } from '@prisma/client/runtime/library';

@InputType()
export class PromptUpdateInput {
  @Field(() => ID, { description: PromptDescription.Id })
  @IsNotEmpty({
    message: I18N(`${PROMPT_I18N}.${PromptDescription.Id}${ValidatorDescription.IsNotEmpty}`),
  })
  id: string;

  @Field(() => String, { description: PromptDescription.Name, nullable: true })
  @IsOptional()
  name?: string;

  @Field(() => String, { description: PromptDescription.User, nullable: true })
  @IsOptional()
  user?: string;

  @Field(() => String, { description: PromptDescription.System, nullable: true })
  @IsOptional()
  system?: string;

  @Field(() => String, { description: PromptDescription.ModelId, nullable: true })
  @IsOptional()
  modelId?: string;

  @Field(() => String, { description: PromptDescription.ModelType, nullable: true })
  @IsOptional()
  modelType?: string;

  @Field(() => GraphQLJSON, { description: PromptDescription.UserVars, nullable: true })
  @IsOptional()
  userVars?: JsonValue;

  @Field(() => String, { description: PromptDescription.Description, nullable: true })
  @IsOptional()
  description?: string;
}
