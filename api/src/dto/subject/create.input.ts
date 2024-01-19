import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { IsExist, ValidatorDescription } from '@api/core';
import { SubjectDescription } from './subject.enum';

@InputType()
export class CreateSubjectInput {
  @Field({ description: SubjectDescription.Name })
  @IsNotEmpty({ message: `${SubjectDescription.Name}${ValidatorDescription.NotEmpty}` })
  @IsExist('subject', { message: `${SubjectDescription.Name}${ValidatorDescription.IsExist}` })
  name: string;

  @Field({ description: SubjectDescription.Code })
  @IsNotEmpty({ message: `${SubjectDescription.Code}${ValidatorDescription.NotEmpty}` })
  @IsExist('subject', { message: `${SubjectDescription.Code}${ValidatorDescription.IsExist}` })
  code: string;

  @Field({ description: SubjectDescription.Description })
  @IsOptional()
  description?: string;
}
