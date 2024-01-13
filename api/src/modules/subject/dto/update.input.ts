import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { SubjectDescription } from '../enum';
import { BaseDescription, IsExist, ValidatorDescription } from '@api/core';

@InputType()
export class UpdateSubjectInput {
  @Field(() => ID, { description: BaseDescription.Id })
  @IsNotEmpty({ message: `${BaseDescription.Id}${ValidatorDescription.NotEmpty}` })
  id: string;

  @Field({ description: SubjectDescription.Name, nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: `${SubjectDescription.Name}${ValidatorDescription.NotEmpty}` })
  @IsExist('subject', { message: `${SubjectDescription.Name}${ValidatorDescription.IsExist}` })
  name?: string;

  @Field({ description: SubjectDescription.Description, nullable: true })
  @IsOptional()
  description?: string;
}
