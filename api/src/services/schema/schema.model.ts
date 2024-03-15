import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseAudit } from '@api/core';
import { SchemaDescription } from './schema.enum';
import { GraphQLJSON } from 'graphql-scalars';

@ObjectType()
export class Schema extends BaseAudit {
  @Field(() => ID, { description: SchemaDescription.Id })
  id: string;

  @Field({ description: SchemaDescription.Name })
  name: string;

  @Field({ description: SchemaDescription.Code })
  code: string;

  @Field(() => GraphQLJSON, { description: SchemaDescription.Json })
  json: object;
}
