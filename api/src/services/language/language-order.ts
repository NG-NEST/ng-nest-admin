import { BaseOrder, SortOrder } from '@api/core';
import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { LanguageDescription } from './language.enum';

@InputType()
export class LanguageOrderInput extends BaseOrder {
  @Field(() => SortOrder, { description: LanguageDescription.Key, nullable: true })
  @IsOptional()
  key?: SortOrder;

  @Field(() => SortOrder, { description: LanguageDescription.Value, nullable: true })
  @IsOptional()
  value?: SortOrder;

  @Field(() => SortOrder, { description: LanguageDescription.LanguageCode, nullable: true })
  @IsOptional()
  languageCode?: SortOrder;
}
