import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseAudit } from '@api/core';
import { SchemaDescription } from './schema.enum';
import { GraphQLJSON } from 'graphql-scalars';
import { JsonValue } from '@prisma/client/runtime/library';
import { IsOptional } from 'class-validator';

@ObjectType()
export class Schema extends BaseAudit {
  @Field(() => ID, { description: SchemaDescription.Id })
  id: string;

  @Field({ description: SchemaDescription.Name })
  name: string;

  @Field({ description: SchemaDescription.Code })
  code: string;

  @Field({ description: SchemaDescription.Description, nullable: true })
  @IsOptional()
  description?: string;

  @Field({ description: SchemaDescription.Version, nullable: true })
  @IsOptional()
  version?: string;

  @Field(() => GraphQLJSON, { description: SchemaDescription.Json })
  json: JsonValue;
}
