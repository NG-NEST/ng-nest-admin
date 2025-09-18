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

  @Field(() => String, { description: PromptDescription.Prompt })
  prompt: string;

  @Field(() => String, { description: PromptDescription.System, nullable: true })
  @IsOptional()
  system?: string;

  @Field(() => String, { description: PromptDescription.Code })
  code: string;

  @Field(() => String, { description: PromptDescription.Platform })
  platform: string;

  @Field(() => GraphQLJSON, { description: PromptDescription.PromptVars, nullable: true })
  @IsOptional()
  promptVars?: JsonValue;

  @Field(() => String, { description: PromptDescription.Description, nullable: true })
  @IsOptional()
  description?: string;
}
