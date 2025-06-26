import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseAudit } from '@api/core';
import { SchemaDataDescription } from './schema-data.enum';
import { JsonValue } from '@prisma/client/runtime/library';
import { Schema, SchemaDescription } from '../schema';
import { GraphQLJSON } from 'graphql-scalars';

@ObjectType()
export class SchemaData extends BaseAudit {
  @Field(() => ID, { description: SchemaDataDescription.Id })
  id: string;

  @Field(() => GraphQLJSON, { description: SchemaDataDescription.Data })
  data: JsonValue;

  @Field({ description: SchemaDescription.Id })
  schemaId: string;

  @Field(() => Schema, { description: SchemaDescription.Schema })
  schema: Schema;
}
