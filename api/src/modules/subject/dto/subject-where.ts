import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { SubjectDescription } from '../enum';
import { BaseStringFilter, BaseWhereInput, StringFilter } from '@api/core';

@InputType()
export class SubjectWhere {
  @Field(() => BaseStringFilter, { description: SubjectDescription.Name, nullable: true })
  @IsOptional()
  name?: StringFilter;

  @Field(() => BaseStringFilter, { description: SubjectDescription.Description, nullable: true })
  @IsOptional()
  description?: StringFilter;
}

@InputType()
export class SubjectWhereInput extends BaseWhereInput(SubjectWhere) {}
