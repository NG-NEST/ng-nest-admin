import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { BaseStringFilter, BaseWhereInput, NumberFilter, StringFilter } from '@api/core';
import { ResourceDescription } from './resource.enum';
import { SubjectDescription } from '../subject';

@InputType()
export class ResourceWhere {
  @Field(() => BaseStringFilter, { description: ResourceDescription.Name, nullable: true })
  @IsOptional()
  name?: StringFilter;

  @Field(() => BaseStringFilter, { description: ResourceDescription.Code, nullable: true })
  @IsOptional()
  code?: StringFilter;

  @Field(() => BaseStringFilter, { description: ResourceDescription.Sort, nullable: true })
  @IsOptional()
  sort?: NumberFilter;

  @Field(() => BaseStringFilter, { description: ResourceDescription.Description, nullable: true })
  @IsOptional()
  description?: StringFilter;

  @Field(() => BaseStringFilter, { description: ResourceDescription.Pid, nullable: true })
  @IsOptional()
  pid?: StringFilter;

  @Field(() => BaseStringFilter, { description: SubjectDescription.Id, nullable: true })
  @IsOptional()
  subjectId?: StringFilter;
}

@InputType()
export class ResourceWhereInput extends BaseWhereInput(ResourceWhere) {}
