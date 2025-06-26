import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsJSON } from 'class-validator';
import { ValidatorDescription, I18N } from '@api/core';
import { SchemaDescription, SCHEMA_I18N } from './schema.enum';
import { GraphQLJSON } from 'graphql-scalars';
import { JsonValue } from '@prisma/client/runtime/library';

@InputType()
export class SchemaUpdateInput {
  @Field(() => ID, { description: SchemaDescription.Id })
  @IsNotEmpty({
    message: I18N(`${SCHEMA_I18N}.${SchemaDescription.Id}${ValidatorDescription.IsNotEmpty}`),
  })
  id: string;

  @Field({ description: SchemaDescription.Name, nullable: true })
  @IsOptional()
  name?: string;

  @Field({ description: SchemaDescription.Description, nullable: true })
  @IsOptional()
  description?: string;

  @Field({ description: SchemaDescription.Version, nullable: true })
  @IsOptional()
  versoin?: string;

  @Field({ description: SchemaDescription.Code, nullable: true })
  @IsOptional()
  code?: string;

  @Field(() => GraphQLJSON, { description: SchemaDescription.Json, nullable: true })
  @IsOptional()
  @IsJSON()
  json?: JsonValue;
}
