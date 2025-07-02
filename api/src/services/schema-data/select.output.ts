import { Field, ID, ObjectType } from '@nestjs/graphql';
import { SchemaDataDescription } from './schema-data.enum';
import { BaseAudit } from '@api/core';
import { GraphQLJSON } from 'graphql-scalars';
import { JsonValue } from '@prisma/client/runtime/library';
import { Schema, SchemaDescription } from '../schema';
import { IsOptional } from 'class-validator';

@ObjectType()
export class SchemaDataSelectOutput extends BaseAudit {
  @Field(() => ID, { description: SchemaDataDescription.Id })
  id: string;

  @Field(() => GraphQLJSON, { description: SchemaDataDescription.Data })
  data: JsonValue;

  @Field({ description: SchemaDescription.Id })
  schemaId: string;

  @Field(() => Schema, { description: SchemaDescription.Schema })
  schema: Schema;

  @Field({ description: SchemaDataDescription.FormId, nullable: true })
  @IsOptional()
  formId?: string;
}
