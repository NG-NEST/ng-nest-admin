import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { IsExist, ValidatorDescription, I18N } from '@api/core';
import { SubjectDescription, SUBJECT_I18N } from './subject.enum';

@InputType()
export class SubjectCreateInput {
  @Field({ description: SubjectDescription.Name })
  @IsNotEmpty({
    message: I18N(`${SUBJECT_I18N}.${SubjectDescription.Name}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsExist('subject', {
    message: I18N(`${SUBJECT_I18N}.${SubjectDescription.Name}${ValidatorDescription.IsExist}`),
  })
  name: string;

  @Field({ description: SubjectDescription.Code })
  @IsNotEmpty({
    message: I18N(`${SUBJECT_I18N}.${SubjectDescription.Code}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsExist('subject', {
    message: I18N(`${SUBJECT_I18N}.${SubjectDescription.Code}${ValidatorDescription.IsExist}`),
  })
  code: string;

  @Field({ description: SubjectDescription.Description })
  @IsOptional()
  description?: string;
}
