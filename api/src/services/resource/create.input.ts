import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { IsExist, IsNotExist, ValidatorDescription } from '@api/core';
import { ResourceDescription, ResourceI18n } from './resource.enum';
import { SubjectDescription } from '../subject';
import { i18nValidationMessage } from 'nestjs-i18n';

@InputType()
export class CreateResourceInput {
  @Field({ description: ResourceDescription.Name })
  @IsNotEmpty({
    message: i18nValidationMessage(
      `${ResourceI18n}.${ResourceDescription.Name}${ValidatorDescription.NotEmpty}`,
    ),
  })
  @IsExist('resource', {
    message: i18nValidationMessage(
      `${ResourceI18n}.${ResourceDescription.Name}${ValidatorDescription.IsExist}`,
    ),
  })
  name: string;

  @Field({ description: ResourceDescription.Code })
  @IsNotEmpty({
    message: i18nValidationMessage(
      `${ResourceI18n}.${ResourceDescription.Code}${ValidatorDescription.NotEmpty}`,
    ),
  })
  @IsExist('resource', {
    message: i18nValidationMessage(
      `${ResourceI18n}.${ResourceDescription.Code}${ValidatorDescription.IsExist}`,
    ),
  })
  code: string;

  @Field({ description: ResourceDescription.Sort })
  @IsNotEmpty({
    message: i18nValidationMessage(
      `${ResourceI18n}.${ResourceDescription.Sort}${ValidatorDescription.NotEmpty}`,
    ),
  })
  @IsNumber(
    {},
    {
      message: i18nValidationMessage(
        `${ResourceI18n}.${ResourceDescription.Sort}${ValidatorDescription.IsNotNumber}`,
      ),
    },
  )
  sort: number;

  @Field({ description: ResourceDescription.Description, nullable: null })
  @IsOptional()
  description?: string;

  @Field({ description: SubjectDescription.Id })
  @IsNotEmpty({
    message: i18nValidationMessage(`${SubjectDescription.Id}${ValidatorDescription.NotEmpty}`),
  })
  @IsNotExist('subject', {
    message: i18nValidationMessage(`${SubjectDescription.Id}${ValidatorDescription.IsNotExist}`),
    context: { relation: 'id' },
  })
  subjectId: string;

  @Field(() => ID, { description: ResourceDescription.Pid, nullable: null })
  @IsOptional()
  @IsNotExist('resource', {
    message: i18nValidationMessage(`${ResourceDescription.Pid}${ValidatorDescription.IsNotExist}`),
    context: { relation: 'id' },
  })
  pid?: string;
}
