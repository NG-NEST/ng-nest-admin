import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { BASE_STRING_FILTER, BaseWhereInput, StringFilter } from '@api/core';
import { PromptDescription } from './prompt.enum';

@InputType()
export class PromptWhere {
  @Field(() => BASE_STRING_FILTER, { description: PromptDescription.Name, nullable: true })
  @IsOptional()
  name?: StringFilter;

  @Field(() => BASE_STRING_FILTER, { description: PromptDescription.User, nullable: true })
  @IsOptional()
  user?: StringFilter;

  @Field(() => BASE_STRING_FILTER, { description: PromptDescription.System, nullable: true })
  @IsOptional()
  system?: StringFilter;

  @Field(() => BASE_STRING_FILTER, { description: PromptDescription.ModelId, nullable: true })
  @IsOptional()
  modelId?: StringFilter;

  @Field(() => BASE_STRING_FILTER, { description: PromptDescription.ModelType, nullable: true })
  @IsOptional()
  modelType?: StringFilter;

  @Field(() => BASE_STRING_FILTER, { description: PromptDescription.UserVars, nullable: true })
  @IsOptional()
  userVars?: StringFilter;

  @Field(() => BASE_STRING_FILTER, { description: PromptDescription.Description, nullable: true })
  @IsOptional()
  description?: StringFilter;
}

@InputType()
export class PromptWhereInput extends BaseWhereInput(PromptWhere) {}
