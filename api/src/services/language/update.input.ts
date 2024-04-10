import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { IsExist, ValidatorDescription, I18N } from '@api/core';
import { LanguageDescription, LANGUAGE_I18N } from './language.enum';

@InputType()
export class LanguageUpdateInput {
  @Field(() => ID, { description: LanguageDescription.Id })
  @IsNotEmpty({
    message: I18N(`${LANGUAGE_I18N}.${LanguageDescription.Id}${ValidatorDescription.IsNotEmpty}`),
  })
  id: string;

  @Field({ description: LanguageDescription.Key, nullable: true })
  @IsOptional()
  @IsNotEmpty({
    message: I18N(`${LANGUAGE_I18N}.${LanguageDescription.Key}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsExist('language', {
    message: I18N(`${LANGUAGE_I18N}.${LanguageDescription.Key}${ValidatorDescription.IsExist}`),
  })
  key?: string;

  @Field({ description: LanguageDescription.Value, nullable: true })
  @IsOptional()
  @IsNotEmpty({
    message: I18N(`${LANGUAGE_I18N}.${LanguageDescription.Value}${ValidatorDescription.IsNotEmpty}`),
  })
  value?: string;

  @Field({ description: LanguageDescription.LanguageCode, nullable: true })
  @IsOptional()
  @IsNotEmpty({
    message: I18N(
      `${LANGUAGE_I18N}.${LanguageDescription.LanguageCode}${ValidatorDescription.IsNotEmpty}`,
    ),
  })
  languageCode?: string;
}
