import { Field, InputType } from '@nestjs/graphql';
import { IsJSON, IsNotEmpty, IsOptional } from 'class-validator';
import { ValidatorDescription, I18N } from '@api/core';
import { SchemaDescription, SCHEMA_I18N } from './schema.enum';
import { GraphQLJSON } from 'graphql-scalars';
import { JsonValue } from '@prisma/client/runtime/library';

@InputType()
export class SchemaCreateInput {
  @Field({ description: SchemaDescription.Name })
  @IsNotEmpty({
    message: I18N(`${SCHEMA_I18N}.${SchemaDescription.Name}${ValidatorDescription.IsNotEmpty}`),
  })
  name: string;

  @Field({ description: SchemaDescription.Code })
  @IsNotEmpty({
    message: I18N(`${SCHEMA_I18N}.${SchemaDescription.Code}${ValidatorDescription.IsNotEmpty}`),
  })
  code: string;

  @Field({ description: SchemaDescription.Description, nullable: true })
  @IsOptional()
  description?: string;

  @Field({ description: SchemaDescription.Version, nullable: true })
  @IsOptional()
  version?: string;

  @Field(() => GraphQLJSON, { description: SchemaDescription.Json })
  @IsNotEmpty({
    message: I18N(`${SCHEMA_I18N}.${SchemaDescription.Json}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsJSON()
  json: JsonValue;
}
