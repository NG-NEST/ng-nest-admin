import { BaseOrder, SortOrder } from '@api/core';
import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { PromptDescription } from './prompt.enum';

@InputType()
export class PromptOrderInput extends BaseOrder {
  @Field(() => SortOrder, { description: PromptDescription.Name, nullable: true })
  @IsOptional()
  name?: SortOrder;

  @Field(() => SortOrder, { description: PromptDescription.Prompt, nullable: true })
  @IsOptional()
  prompt?: SortOrder;

  @Field(() => SortOrder, { description: PromptDescription.System, nullable: true })
  @IsOptional()
  system?: SortOrder;

  @Field(() => SortOrder, { description: PromptDescription.Code, nullable: true })
  @IsOptional()
  code?: SortOrder;

  @Field(() => SortOrder, { description: PromptDescription.Platform, nullable: true })
  @IsOptional()
  platform?: SortOrder;

  @Field(() => SortOrder, { description: PromptDescription.Description, nullable: true })
  @IsOptional()
  description?: SortOrder;
}
