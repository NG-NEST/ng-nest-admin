import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { IsExist, IsNotExist, ValidatorDescription, i18n } from '@api/core';
import { ResourceDescription, ResourceI18n } from './resource.enum';
import { SubjectDescription } from '../subject';

@InputType()
export class ResourceCreateInput {
  @Field({ description: ResourceDescription.Name })
  @IsNotEmpty({
    message: i18n(`${ResourceI18n}.${ResourceDescription.Name}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsExist('resource', {
    message: i18n(`${ResourceI18n}.${ResourceDescription.Name}${ValidatorDescription.IsExist}`),
  })
  name: string;

  @Field({ description: ResourceDescription.Code })
  @IsNotEmpty({
    message: i18n(`${ResourceI18n}.${ResourceDescription.Code}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsExist('resource', {
    message: i18n(`${ResourceI18n}.${ResourceDescription.Code}${ValidatorDescription.IsExist}`),
  })
  code: string;

  @Field({ description: ResourceDescription.Sort })
  @IsNotEmpty({
    message: i18n(`${ResourceI18n}.${ResourceDescription.Sort}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsNumber(
    {},
    {
      message: i18n(
        `${ResourceI18n}.${ResourceDescription.Sort}${ValidatorDescription.IsNotNumber}`,
      ),
    },
  )
  sort: number;

  @Field({ description: ResourceDescription.Description, nullable: true })
  @IsOptional()
  description?: string;

  @Field({ description: SubjectDescription.Id })
  @IsNotEmpty({
    message: i18n(`${ResourceI18n}.${SubjectDescription.Id}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsNotExist('subject', {
    message: i18n(`${ResourceI18n}.${SubjectDescription.Id}${ValidatorDescription.IsNotExist}`),
    context: { relation: 'id' },
  })
  subjectId: string;

  @Field(() => ID, { description: ResourceDescription.Pid, nullable: true })
  @IsOptional()
  @IsNotExist('resource', {
    message: i18n(`${ResourceI18n}.${ResourceDescription.Pid}${ValidatorDescription.IsNotExist}`),
    context: { relation: 'id' },
  })
  pid?: string;
}
