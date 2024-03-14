import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { IsExist, ValidatorDescription, i18n } from '@api/core';
import { SubjectDescription, SubjectI18n } from './subject.enum';

@InputType()
export class SubjectUpdateInput {
  @Field(() => ID, { description: SubjectDescription.Id })
  @IsNotEmpty({
    message: i18n(`${SubjectI18n}.${SubjectDescription.Id}${ValidatorDescription.IsNotEmpty}`),
  })
  id: string;

  @Field({ description: SubjectDescription.Name, nullable: true })
  @IsOptional()
  @IsNotEmpty({
    message: i18n(`${SubjectI18n}.${SubjectDescription.Name}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsExist('subject', {
    message: i18n(`${SubjectI18n}.${SubjectDescription.Name}${ValidatorDescription.IsExist}`),
  })
  name?: string;

  @Field({ description: SubjectDescription.Code, nullable: true })
  @IsOptional()
  @IsNotEmpty({
    message: i18n(`${SubjectI18n}.${SubjectDescription.Code}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsExist('subject', {
    message: i18n(`${SubjectI18n}.${SubjectDescription.Code}${ValidatorDescription.IsExist}`),
  })
  code?: string;

  @Field({ description: SubjectDescription.Description, nullable: true })
  @IsOptional()
  description?: string;
}
