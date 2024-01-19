import { Field, ID, ObjectType } from '@nestjs/graphql';
import { SubjectDescription } from './subject.enum';

@ObjectType()
export class SubjectSelectOutput {
  @Field(() => ID, { description: SubjectDescription.Id })
  id: string;

  @Field({ description: SubjectDescription.Name })
  name: string;

  @Field({ description: SubjectDescription.Code })
  code: string;
}
