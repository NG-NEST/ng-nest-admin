import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { SubjectDescription } from '../enum';
import { IsExist, ValidatorDescription } from '@api/core';

@InputType()
export class CreateSubjectInput {
  @Field({ description: SubjectDescription.Name })
  @IsNotEmpty({ message: `${SubjectDescription.Name}${ValidatorDescription.NotEmpty}` })
  @IsExist('subject', { message: `${SubjectDescription.Name}${ValidatorDescription.IsExist}` })
  name: string;

  @Field({ description: SubjectDescription.Description })
  @IsOptional()
  description?: string;
}
