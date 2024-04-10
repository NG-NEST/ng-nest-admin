import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { BASE_STRING_FILTER, BaseWhereInput, StringFilter } from '@api/core';
import { LanguageDescription } from './language.enum';

@InputType()
export class LanguageWhere {
  @Field(() => BASE_STRING_FILTER, { description: LanguageDescription.Key, nullable: true })
  @IsOptional()
  key?: StringFilter;

  @Field(() => BASE_STRING_FILTER, { description: LanguageDescription.Value, nullable: true })
  @IsOptional()
  value?: StringFilter;

  @Field(() => BASE_STRING_FILTER, { description: LanguageDescription.LanguageCode, nullable: true })
  @IsOptional()
  languageCode?: StringFilter;
}

@InputType()
export class LanguageWhereInput extends BaseWhereInput(LanguageWhere) {}
