import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { IsExist, IsNotExist, ValidatorDescription, i18n } from '@api/core';
import { DictionaryDescription, DictionaryI18n } from './dictionary.enum';

@InputType()
export class UpdateDictionaryInput {
  @Field(() => ID, { description: DictionaryDescription.Id })
  @IsNotEmpty({
    message: i18n(
      `${DictionaryI18n}.${DictionaryDescription.Id}${ValidatorDescription.IsNotEmpty}`,
    ),
  })
  id: string;

  @Field({ description: DictionaryDescription.Name, nullable: null })
  @IsOptional()
  @IsExist('dictionary', {
    message: i18n(`${DictionaryI18n}.${DictionaryDescription.Name}${ValidatorDescription.IsExist}`),
  })
  name?: string;

  @Field({ description: DictionaryDescription.Code, nullable: null })
  @IsOptional()
  @IsExist('dictionary', {
    message: i18n(`${DictionaryI18n}.${DictionaryDescription.Code}${ValidatorDescription.IsExist}`),
  })
  code?: string;

  @Field({ description: DictionaryDescription.Sort, nullable: null })
  @IsOptional()
  @IsNumber(
    {},
    {
      message: i18n(
        `${DictionaryI18n}.${DictionaryDescription.Sort}${ValidatorDescription.IsNotNumber}`,
      ),
    },
  )
  sort?: number;

  @Field({ description: DictionaryDescription.Description, nullable: null })
  @IsOptional()
  description?: string;

  @Field(() => ID, { description: DictionaryDescription.Pid, nullable: null })
  @IsOptional()
  @IsNotExist('dictionary', {
    message: i18n(
      `${DictionaryI18n}.${DictionaryDescription.Pid}${ValidatorDescription.IsNotExist}`,
    ),
    context: { relation: 'id' },
  })
  pid?: string;
}
