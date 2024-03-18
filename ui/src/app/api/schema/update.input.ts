import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { IsExist, ValidatorDescription, i18n } from '@api/core';
import { SchemaDescription, SchemaI18n } from './schema.enum';
import { GraphQLJSON } from 'graphql-scalars';

@InputType()
export class SchemaUpdateInput {
  @Field(() => ID, { description: SchemaDescription.Id })
  @IsNotEmpty({
    message: i18n(`${SchemaI18n}.${SchemaDescription.Id}${ValidatorDescription.IsNotEmpty}`),
  })
  id: string;

  @Field({ description: SchemaDescription.Name, nullable: true })
  @IsOptional()
  @IsExist('schema', {
    message: i18n(`${SchemaI18n}.${SchemaDescription.Name}${ValidatorDescription.IsExist}`),
  })
  name?: string;

  @Field({ description: SchemaDescription.Code, nullable: true })
  @IsOptional()
  @IsExist('schema', {
    message: i18n(`${SchemaI18n}.${SchemaDescription.Code}${ValidatorDescription.IsExist}`),
  })
  code?: string;

  @Field(() => GraphQLJSON, { description: SchemaDescription.Json, nullable: true })
  @IsOptional()
  json?: object;
}
