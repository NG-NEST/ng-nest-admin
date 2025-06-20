import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import {
  BASE_NUMBER_FILTER,
  BASE_STRING_FILTER,
  BaseWhereInput,
  NumberFilter,
  StringFilter,
} from '@api/core';
import { ResourceDescription } from './resource.enum';
import { SubjectDescription, SubjectWhereInput } from '../subject';

@InputType()
export class ResourceWhere {
  @Field(() => BASE_STRING_FILTER, { description: ResourceDescription.Name, nullable: true })
  @IsOptional()
  name?: StringFilter;

  @Field(() => BASE_STRING_FILTER, { description: ResourceDescription.Code, nullable: true })
  @IsOptional()
  code?: StringFilter;

  @Field(() => BASE_NUMBER_FILTER, { description: ResourceDescription.Sort, nullable: true })
  @IsOptional()
  sort?: NumberFilter;

  @Field(() => BASE_STRING_FILTER, { description: ResourceDescription.Type, nullable: true })
  @IsOptional()
  type?: StringFilter;

  @Field(() => BASE_STRING_FILTER, { description: ResourceDescription.Description, nullable: true })
  @IsOptional()
  description?: StringFilter;

  @Field(() => BASE_STRING_FILTER, { description: ResourceDescription.Pid, nullable: true })
  @IsOptional()
  pid?: StringFilter;

  @Field(() => BASE_STRING_FILTER, { description: SubjectDescription.Id, nullable: true })
  @IsOptional()
  subjectId?: StringFilter;

  @Field(() => SubjectWhereInput, { description: SubjectDescription.Subject, nullable: true })
  @IsOptional()
  subject?: SubjectWhereInput;
}

@InputType()
export class ResourceWhereInput extends BaseWhereInput(ResourceWhere) {}
