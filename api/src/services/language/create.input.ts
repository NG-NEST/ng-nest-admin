import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { IsExist, ValidatorDescription, i18n } from '@api/core';
import { LanguageDescription, LanguageI18n } from './language.enum';

@InputType()
export class CreateLanguageInput {
  @Field({ description: LanguageDescription.Key })
  @IsNotEmpty({
    message: i18n(`${LanguageI18n}.${LanguageDescription.Key}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsExist('language', {
    message: i18n(`${LanguageI18n}.${LanguageDescription.Key}${ValidatorDescription.IsExist}`),
  })
  key: string;

  @Field({ description: LanguageDescription.Value })
  @IsOptional()
  @IsNotEmpty({
    message: i18n(`${LanguageI18n}.${LanguageDescription.Value}${ValidatorDescription.IsNotEmpty}`),
  })
  value?: string;

  @Field({ description: LanguageDescription.LanguageCode })
  @IsNotEmpty({
    message: i18n(
      `${LanguageI18n}.${LanguageDescription.LanguageCode}${ValidatorDescription.IsNotEmpty}`,
    ),
  })
  languageCode: string;
}
