import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseAudit } from '@api/core';
import { PromptDescription } from './prompt.enum';
import { GraphQLJSON } from 'graphql-scalars';
import { IsOptional } from 'class-validator';
import { JsonValue } from '@prisma/client/runtime/library';

@ObjectType()
export class Prompt extends BaseAudit {
  @Field(() => ID, { description: PromptDescription.Id })
  id: string;

  @Field(() => String, { description: PromptDescription.Name })
  name: string;

  @Field(() => String, { description: PromptDescription.User })
  user: string;

  @Field(() => String, { description: PromptDescription.System, nullable: true })
  @IsOptional()
  system?: string;

  @Field(() => String, { description: PromptDescription.ModelId })
  modelId: string;

  @Field(() => String, { description: PromptDescription.ModelType })
  modelType: string;

  @Field(() => GraphQLJSON, { description: PromptDescription.UserVars, nullable: true })
  @IsOptional()
  userVars?: JsonValue;

  @Field(() => String, { description: PromptDescription.Description, nullable: true })
  @IsOptional()
  description?: string;
}
