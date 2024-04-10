import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { BASE_STRING_FILTER, BaseWhereInput, StringFilter } from '@api/core';
import { SubjectDescription } from './subject.enum';

@InputType()
export class SubjectWhere {
  @Field(() => BASE_STRING_FILTER, { description: SubjectDescription.Name, nullable: true })
  @IsOptional()
  name?: StringFilter;

  @Field(() => BASE_STRING_FILTER, { description: SubjectDescription.Code, nullable: true })
  @IsOptional()
  code?: StringFilter;

  @Field(() => BASE_STRING_FILTER, { description: SubjectDescription.Description, nullable: true })
  @IsOptional()
  description?: StringFilter;
}

@InputType()
export class SubjectWhereInput extends BaseWhereInput(SubjectWhere) {}
