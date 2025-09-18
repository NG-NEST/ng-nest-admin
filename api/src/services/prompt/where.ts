import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { BASE_STRING_FILTER, BaseWhereInput, StringFilter } from '@api/core';
import { PromptDescription } from './prompt.enum';

@InputType()
export class PromptWhere {
  @Field(() => BASE_STRING_FILTER, { description: PromptDescription.Name, nullable: true })
  @IsOptional()
  name?: StringFilter;

  @Field(() => BASE_STRING_FILTER, { description: PromptDescription.Prompt, nullable: true })
  @IsOptional()
  prompt?: StringFilter;

  @Field(() => BASE_STRING_FILTER, { description: PromptDescription.System, nullable: true })
  @IsOptional()
  system?: StringFilter;

  @Field(() => BASE_STRING_FILTER, { description: PromptDescription.Code, nullable: true })
  @IsOptional()
  code?: StringFilter;

  @Field(() => BASE_STRING_FILTER, { description: PromptDescription.Platform, nullable: true })
  @IsOptional()
  platform?: StringFilter;

  @Field(() => BASE_STRING_FILTER, { description: PromptDescription.PromptVars, nullable: true })
  @IsOptional()
  promptVars?: StringFilter;

  @Field(() => BASE_STRING_FILTER, { description: PromptDescription.Description, nullable: true })
  @IsOptional()
  description?: StringFilter;
}

@InputType()
export class PromptWhereInput extends BaseWhereInput(PromptWhere) {}
