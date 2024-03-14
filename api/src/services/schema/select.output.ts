import { Field, ID, ObjectType } from '@nestjs/graphql';
import { SchemaDescription } from './schema.enum';

@ObjectType()
export class SchemaSelectOutput {
  @Field(() => ID, { description: SchemaDescription.Id })
  id: string;

  @Field({ description: SchemaDescription.Name })
  name: string;

  @Field({ description: SchemaDescription.Code })
  code: string;
}
