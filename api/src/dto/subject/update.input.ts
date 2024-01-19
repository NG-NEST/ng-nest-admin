import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { IsExist, ValidatorDescription } from '@api/core';
import { SubjectDescription } from './subject.enum';

@InputType()
export class UpdateSubjectInput {
  @Field(() => ID, { description: SubjectDescription.Id })
  @IsNotEmpty({ message: `${SubjectDescription.Id}${ValidatorDescription.NotEmpty}` })
  id: string;

  @Field({ description: SubjectDescription.Name, nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: `${SubjectDescription.Name}${ValidatorDescription.NotEmpty}` })
  @IsExist('subject', { message: `${SubjectDescription.Name}${ValidatorDescription.IsExist}` })
  name?: string;

  @Field({ description: SubjectDescription.Code, nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: `${SubjectDescription.Code}${ValidatorDescription.NotEmpty}` })
  @IsExist('subject', { message: `${SubjectDescription.Code}${ValidatorDescription.IsExist}` })
  code?: string;

  @Field({ description: SubjectDescription.Description, nullable: true })
  @IsOptional()
  description?: string;
}
