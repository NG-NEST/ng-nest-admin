import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { IsExist, IsNotExist, ValidatorDescription, I18N } from '@api/core';
import { DictionaryDescription, DICTIONARY_I18N } from './dictionary.enum';

@InputType()
export class DictionaryCreateInput {
  @Field({ description: DictionaryDescription.Name })
  @IsNotEmpty({
    message: I18N(
      `${DICTIONARY_I18N}.${DictionaryDescription.Name}${ValidatorDescription.IsNotEmpty}`,
    ),
  })
  @IsExist('dictionary', {
    message: I18N(`${DICTIONARY_I18N}.${DictionaryDescription.Name}${ValidatorDescription.IsExist}`),
  })
  name: string;

  @Field({ description: DictionaryDescription.Code })
  @IsNotEmpty({
    message: I18N(
      `${DICTIONARY_I18N}.${DictionaryDescription.Code}${ValidatorDescription.IsNotEmpty}`,
    ),
  })
  @IsExist('dictionary', {
    message: I18N(`${DICTIONARY_I18N}.${DictionaryDescription.Code}${ValidatorDescription.IsExist}`),
  })
  code: string;

  @Field({ description: DictionaryDescription.Sort })
  @IsNotEmpty({
    message: I18N(
      `${DICTIONARY_I18N}.${DictionaryDescription.Sort}${ValidatorDescription.IsNotEmpty}`,
    ),
  })
  @IsNumber(
    {},
    {
      message: I18N(
        `${DICTIONARY_I18N}.${DictionaryDescription.Sort}${ValidatorDescription.IsNotNumber}`,
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
    message: I18N(
      `${DICTIONARY_I18N}.${DictionaryDescription.Pid}${ValidatorDescription.IsNotExist}`,
    ),
    context: { relation: 'id' },
  })
  pid?: string;
}
