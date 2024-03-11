import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { IsExist, IsNotExist, ValidatorDescription, i18n } from '@api/core';
import { DictionaryDescription, DictionaryI18n } from './dictionary.enum';

@InputType()
export class CreateDictionaryInput {
  @Field({ description: DictionaryDescription.Name })
  @IsNotEmpty({
    message: i18n(
      `${DictionaryI18n}.${DictionaryDescription.Name}${ValidatorDescription.IsNotEmpty}`,
    ),
  })
  @IsExist('dictionary', {
    message: i18n(`${DictionaryI18n}.${DictionaryDescription.Name}${ValidatorDescription.IsExist}`),
  })
  name: string;

  @Field({ description: DictionaryDescription.Code })
  @IsNotEmpty({
    message: i18n(
      `${DictionaryI18n}.${DictionaryDescription.Code}${ValidatorDescription.IsNotEmpty}`,
    ),
  })
  @IsExist('dictionary', {
    message: i18n(`${DictionaryI18n}.${DictionaryDescription.Code}${ValidatorDescription.IsExist}`),
  })
  code: string;

  @Field({ description: DictionaryDescription.Sort })
  @IsNotEmpty({
    message: i18n(
      `${DictionaryI18n}.${DictionaryDescription.Sort}${ValidatorDescription.IsNotEmpty}`,
    ),
  })
  @IsNumber(
    {},
    {
      message: i18n(
        `${DictionaryI18n}.${DictionaryDescription.Sort}${ValidatorDescription.IsNotNumber}`,
      ),
    },
  )
  sort: number;

  @Field({ description: DictionaryDescription.Description, nullable: true })
  @IsOptional()
  description?: string;

  @Field(() => ID, { description: DictionaryDescription.Pid, nullable: true })
  @IsOptional()
  @IsNotExist('dictionary', {
    message: i18n(
      `${DictionaryI18n}.${DictionaryDescription.Pid}${ValidatorDescription.IsNotExist}`,
    ),
    context: { relation: 'id' },
  })
  pid?: string;
}
