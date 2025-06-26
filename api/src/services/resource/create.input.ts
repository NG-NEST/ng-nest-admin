import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { IsNotExist, ValidatorDescription, I18N } from '@api/core';
import { ResourceDescription, RESOURCE_I18N } from './resource.enum';
import { SubjectDescription } from '../subject';

@InputType()
export class ResourceCreateInput {
  @Field({ description: ResourceDescription.Name })
  @IsNotEmpty({
    message: I18N(`${RESOURCE_I18N}.${ResourceDescription.Name}${ValidatorDescription.IsNotEmpty}`),
  })
  name: string;

  @Field({ description: ResourceDescription.Code })
  @IsNotEmpty({
    message: I18N(`${RESOURCE_I18N}.${ResourceDescription.Code}${ValidatorDescription.IsNotEmpty}`),
  })
  code: string;

  @Field({ description: ResourceDescription.Sort })
  @IsNotEmpty({
    message: I18N(`${RESOURCE_I18N}.${ResourceDescription.Sort}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsNumber(
    {},
    {
      message: I18N(
        `${RESOURCE_I18N}.${ResourceDescription.Sort}${ValidatorDescription.IsNotNumber}`,
      ),
    },
  )
  sort: number;

  @Field({ description: ResourceDescription.Type, nullable: true })
  @IsOptional()
  type?: string;

  @Field({ description: ResourceDescription.Icon, nullable: true })
  @IsOptional()
  icon?: string;

  @Field({ description: ResourceDescription.Description, nullable: true })
  @IsOptional()
  description?: string;

  @Field({ description: SubjectDescription.Id })
  @IsNotEmpty({
    message: I18N(`${RESOURCE_I18N}.${SubjectDescription.Id}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsNotExist('subject', {
    message: I18N(`${RESOURCE_I18N}.${SubjectDescription.Id}${ValidatorDescription.IsNotExist}`),
    context: { relation: 'id' },
  })
  subjectId: string;

  @Field(() => ID, { description: ResourceDescription.Pid, nullable: true })
  @IsOptional()
  @IsNotExist('resource', {
    message: I18N(`${RESOURCE_I18N}.${ResourceDescription.Pid}${ValidatorDescription.IsNotExist}`),
    context: { relation: 'id' },
  })
  pid?: string;
}
