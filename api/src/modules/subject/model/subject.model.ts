import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '@api/core';
import { SubjectDescription } from '../enum';
import { IsOptional } from 'class-validator';

@ObjectType()
export class Subject extends BaseModel {
  @Field({ description: SubjectDescription.Name })
  name: string;

  @Field({ description: SubjectDescription.Description })
  @IsOptional()
  description?: string;
}
