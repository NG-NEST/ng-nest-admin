import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseAudit } from '@api/core';
import { IsOptional } from 'class-validator';
import { Subject, SubjectDescription } from '../subject';
import { ResourceDescription } from './resource.enum';

@ObjectType()
export class Resource extends BaseAudit {
  @Field(() => ID, { description: ResourceDescription.Id })
  id: string;

  @Field(() => ID, { description: ResourceDescription.Pid, nullable: true })
  @IsOptional()
  pid?: string;

  @Field(() => Resource, { description: ResourceDescription.Parent, nullable: true })
  @IsOptional()
  parent?: Resource;

  @Field(() => [Resource], { description: ResourceDescription.Children, nullable: true })
  @IsOptional()
  children?: Resource[];

  @Field({ description: ResourceDescription.Name })
  name: string;

  @Field({ description: ResourceDescription.Code })
  code: string;

  @Field({ description: ResourceDescription.Sort })
  sort: number;

  @Field({ description: ResourceDescription.Type, nullable: true })
  @IsOptional()
  type?: string;

  @Field({ description: ResourceDescription.Icon, nullable: true })
  @IsOptional()
  icon?: string;

  @Field({ description: ResourceDescription.Description, nullable: true })
  @IsOptional()
  description?: string;

  @Field({ description: SubjectDescription.Id })
  subjectId: string;

  @Field(() => Subject, { description: SubjectDescription.Subject })
  subject: Subject;
}
