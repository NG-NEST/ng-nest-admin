import { Field, ID, ObjectType } from '@nestjs/graphql';
import { SubjectDescription } from '../enum';
import { BaseDescription } from '@api/core';

@ObjectType()
export class SubjectSelectOutput {
  @Field(() => ID, { description: BaseDescription.Id })
  id: string;

  @Field({ description: SubjectDescription.Name })
  name: string;
}
