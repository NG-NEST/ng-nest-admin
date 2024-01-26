import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { IsExist, IsNotExist, ValidatorDescription } from '@api/core';
import { ResourceDescription } from './resource.enum';
import { SubjectDescription } from '../subject';

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

  @Field({ description: ResourceDescription.Sort })
  @IsNotEmpty({ message: `${ResourceDescription.Sort}${ValidatorDescription.NotEmpty}` })
  @IsNumber({}, { message: `${ResourceDescription.Sort}${ValidatorDescription.IsNotNumber}` })
  sort: number;

  @Field({ description: ResourceDescription.Description, nullable: null })
  @IsOptional()
  description?: string;

  @Field({ description: SubjectDescription.Id })
  @IsNotEmpty({ message: `${SubjectDescription.Id}${ValidatorDescription.NotEmpty}` })
  @IsNotExist('subject', {
    message: `${SubjectDescription.Id}${ValidatorDescription.IsNotExist}`,
    context: { relation: 'id' }
  })
  subjectId: string;

  @Field(() => ID, { description: ResourceDescription.Pid, nullable: null })
  @IsOptional()
  @IsNotExist('resource', {
    message: `${ResourceDescription.Pid}${ValidatorDescription.IsNotExist}`,
    context: { relation: 'id' }
  })
  pid?: string;
}
