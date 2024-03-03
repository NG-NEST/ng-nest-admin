import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { IsExist, ValidatorDescription, i18n } from '@api/core';
import { SubjectDescription, SubjectI18n } from './subject.enum';

@InputType()
export class CreateSubjectInput {
  @Field({ description: SubjectDescription.Name })
  @IsNotEmpty({
    message: i18n(`${SubjectI18n}.${SubjectDescription.Name}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsExist('subject', {
    message: i18n(`${SubjectI18n}.${SubjectDescription.Name}${ValidatorDescription.IsExist}`),
  })
  name: string;

  @Field({ description: SubjectDescription.Code })
  @IsNotEmpty({
    message: i18n(`${SubjectI18n}.${SubjectDescription.Code}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsExist('subject', {
    message: i18n(`${SubjectI18n}.${SubjectDescription.Code}${ValidatorDescription.IsExist}`),
  })
  code: string;

  @Field({ description: SubjectDescription.Description })
  @IsOptional()
  description?: string;
}
