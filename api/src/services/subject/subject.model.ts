import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseAudit } from '@api/core';
import { IsOptional } from 'class-validator';
import { SubjectDescription } from './subject.enum';

@ObjectType()
export class Subject extends BaseAudit {
  @Field(() => ID, { description: SubjectDescription.Id })
  id: string;

  @Field({ description: SubjectDescription.Name })
  name: string;

  @Field({ description: SubjectDescription.Code })
  code: string;

  @Field({ description: SubjectDescription.Description })
  @IsOptional()
  description?: string;
}
