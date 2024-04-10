import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { IsExist, ValidatorDescription, I18N } from '@api/core';
import { SchemaDescription, SCHEMA_I18N } from './schema.enum';
import { GraphQLJSON } from 'graphql-scalars';

@InputType()
export class SchemaUpdateInput {
  @Field(() => ID, { description: SchemaDescription.Id })
  @IsNotEmpty({
    message: I18N(`${SCHEMA_I18N}.${SchemaDescription.Id}${ValidatorDescription.IsNotEmpty}`),
  })
  id: string;

  @Field({ description: SchemaDescription.Name, nullable: true })
  @IsOptional()
  @IsExist('schema', {
    message: I18N(`${SCHEMA_I18N}.${SchemaDescription.Name}${ValidatorDescription.IsExist}`),
  })
  name?: string;

  @Field({ description: SchemaDescription.Code, nullable: true })
  @IsOptional()
  @IsExist('schema', {
    message: I18N(`${SCHEMA_I18N}.${SchemaDescription.Code}${ValidatorDescription.IsExist}`),
  })
  code?: string;

  @Field(() => GraphQLJSON, { description: SchemaDescription.Json, nullable: true })
  @IsOptional()
  json?: object;
}
