import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { IsExist, ValidatorDescription, i18n } from '@api/core';
import { LanguageDescription, LanguageI18n } from './language.enum';

@InputType()
export class LanguageUpdateInput {
  @Field(() => ID, { description: LanguageDescription.Id })
  @IsNotEmpty({
    message: i18n(`${LanguageI18n}.${LanguageDescription.Id}${ValidatorDescription.IsNotEmpty}`),
  })
  id: string;

  @Field({ description: LanguageDescription.Key, nullable: true })
  @IsOptional()
  @IsNotEmpty({
    message: i18n(`${LanguageI18n}.${LanguageDescription.Key}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsExist('language', {
    message: i18n(`${LanguageI18n}.${LanguageDescription.Key}${ValidatorDescription.IsExist}`),
  })
  key: string;

  @Field({ description: LanguageDescription.Value, nullable: true })
  @IsOptional()
  @IsNotEmpty({
    message: i18n(`${LanguageI18n}.${LanguageDescription.Value}${ValidatorDescription.IsNotEmpty}`),
  })
  value?: string;

  @Field({ description: LanguageDescription.LanguageCode, nullable: true })
  @IsOptional()
  @IsNotEmpty({
    message: i18n(
      `${LanguageI18n}.${LanguageDescription.LanguageCode}${ValidatorDescription.IsNotEmpty}`,
    ),
  })
  languageCode?: string;
}
