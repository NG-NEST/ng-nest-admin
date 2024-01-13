import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '@api/core';
import { ResourceDescription } from '../enum';
import { IsOptional } from 'class-validator';
import { Subject, SubjectDescription } from '@api/modules';

@ObjectType()
export class Resource extends BaseModel {
  @Field({ description: ResourceDescription.Pid })
  @IsOptional()
  pid?: string;

  @Field({ description: ResourceDescription.Name })
  name: string;

  @Field({ description: ResourceDescription.Code })
  code: string;

  @Field({ description: ResourceDescription.SubjectId })
  subjectId: string;

  @Field(() => Subject, { description: SubjectDescription.Subject })
  subject: Subject;
}
