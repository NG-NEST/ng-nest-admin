import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ResourceDescription } from '../enum';
import { IsExist, IsNotExist, ValidatorDescription } from '@api/core';

@InputType()
export class CreateResourceInput {
  @Field({ description: ResourceDescription.Name })
  @IsNotEmpty({ message: `${ResourceDescription.Name}${ValidatorDescription.NotEmpty}` })
  @IsExist('resource', { message: `${ResourceDescription.Name}${ValidatorDescription.IsExist}` })
  name: string;

  @Field({ description: ResourceDescription.Code })
  @IsNotEmpty({ message: `${ResourceDescription.Code}${ValidatorDescription.NotEmpty}` })
  @IsExist('resource', { message: `${ResourceDescription.Code}${ValidatorDescription.IsExist}` })
  code: string;

  @Field({ description: ResourceDescription.SubjectId })
  @IsNotEmpty({ message: `${ResourceDescription.SubjectId}${ValidatorDescription.NotEmpty}` })
  @IsNotExist('subject', { message: `${ResourceDescription.SubjectId}${ValidatorDescription.IsNotExist}`, context: { relation: 'id' } })
  subjectId: string;

  @Field({ description: ResourceDescription.Pid })
  @IsOptional()
  @IsNotExist('resource', { message: `${ResourceDescription.Pid}${ValidatorDescription.IsNotExist}`, context: { relation: 'id' } })
  pid?: string;
}
