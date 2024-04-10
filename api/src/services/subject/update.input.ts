import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { IsExist, ValidatorDescription, I18N } from '@api/core';
import { SubjectDescription, SUBJECT_I18N } from './subject.enum';

@InputType()
export class SubjectUpdateInput {
  @Field(() => ID, { description: SubjectDescription.Id })
  @IsNotEmpty({
    message: I18N(`${SUBJECT_I18N}.${SubjectDescription.Id}${ValidatorDescription.IsNotEmpty}`),
  })
  id: string;

  @Field({ description: SubjectDescription.Name, nullable: true })
  @IsOptional()
  @IsNotEmpty({
    message: I18N(`${SUBJECT_I18N}.${SubjectDescription.Name}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsExist('subject', {
    message: I18N(`${SUBJECT_I18N}.${SubjectDescription.Name}${ValidatorDescription.IsExist}`),
  })
  name?: string;

  @Field({ description: SubjectDescription.Code, nullable: true })
  @IsOptional()
  @IsNotEmpty({
    message: I18N(`${SUBJECT_I18N}.${SubjectDescription.Code}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsExist('subject', {
    message: I18N(`${SUBJECT_I18N}.${SubjectDescription.Code}${ValidatorDescription.IsExist}`),
  })
  code?: string;

  @Field({ description: SubjectDescription.Description, nullable: true })
  @IsOptional()
  description?: string;
}
