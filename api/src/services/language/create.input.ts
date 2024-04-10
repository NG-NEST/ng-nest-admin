import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { IsExist, ValidatorDescription, I18N } from '@api/core';
import { LanguageDescription, LANGUAGE_I18N } from './language.enum';

@InputType()
export class LanguageCreateInput {
  @Field({ description: LanguageDescription.Key })
  @IsNotEmpty({
    message: I18N(`${LANGUAGE_I18N}.${LanguageDescription.Key}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsExist('language', {
    message: I18N(`${LANGUAGE_I18N}.${LanguageDescription.Key}${ValidatorDescription.IsExist}`),
  })
  key: string;

  @Field({ description: LanguageDescription.Value })
  @IsOptional()
  @IsNotEmpty({
    message: I18N(`${LANGUAGE_I18N}.${LanguageDescription.Value}${ValidatorDescription.IsNotEmpty}`),
  })
  value?: string;

  @Field({ description: LanguageDescription.LanguageCode })
  @IsNotEmpty({
    message: I18N(
      `${LANGUAGE_I18N}.${LanguageDescription.LanguageCode}${ValidatorDescription.IsNotEmpty}`,
    ),
  })
  languageCode: string;
}
