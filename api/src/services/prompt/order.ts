import { BaseOrder, SortOrder } from '@api/core';
import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { PromptDescription } from './prompt.enum';

@InputType()
export class PromptOrderInput extends BaseOrder {
  @Field(() => SortOrder, { description: PromptDescription.Name, nullable: true })
  @IsOptional()
  name?: SortOrder;

  @Field(() => SortOrder, { description: PromptDescription.User, nullable: true })
  @IsOptional()
  user?: SortOrder;

  @Field(() => SortOrder, { description: PromptDescription.System, nullable: true })
  @IsOptional()
  system?: SortOrder;

  @Field(() => SortOrder, { description: PromptDescription.ModelId, nullable: true })
  @IsOptional()
  modelId?: SortOrder;

  @Field(() => SortOrder, { description: PromptDescription.ModelType, nullable: true })
  @IsOptional()
  modelType?: SortOrder;

  @Field(() => SortOrder, { description: PromptDescription.Description, nullable: true })
  @IsOptional()
  description?: SortOrder;
}
