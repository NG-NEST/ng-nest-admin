import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { BaseStringFilter, BaseWhereInput, StringFilter } from '@api/core';
import { LanguageDescription } from './language.enum';

@InputType()
export class LanguageWhere {
  @Field(() => BaseStringFilter, { description: LanguageDescription.Key, nullable: true })
  @IsOptional()
  key?: StringFilter;

  @Field(() => BaseStringFilter, { description: LanguageDescription.Value, nullable: true })
  @IsOptional()
  value?: StringFilter;

  @Field(() => BaseStringFilter, { description: LanguageDescription.LanguageCode, nullable: true })
  @IsOptional()
  languageCode?: StringFilter;
}

@InputType()
export class LanguageWhereInput extends BaseWhereInput(LanguageWhere) {}
