import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { IsExist, ValidatorDescription, i18n } from '@api/core';
import { SchemaDescription, SchemaI18n } from './schema.enum';
import { GraphQLJSON } from 'graphql-scalars';

@InputType()
export class SchemaCreateInput {
  @Field({ description: SchemaDescription.Name })
  @IsNotEmpty({
    message: i18n(`${SchemaI18n}.${SchemaDescription.Name}${ValidatorDescription.IsNotEmpty}`),
  })
  name: string;

  @Field({ description: SchemaDescription.Code })
  @IsNotEmpty({
    message: i18n(`${SchemaI18n}.${SchemaDescription.Code}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsExist('schema', {
    message: i18n(`${SchemaI18n}.${SchemaDescription.Code}${ValidatorDescription.IsExist}`),
  })
  code: string;

  @Field(() => GraphQLJSON, { description: SchemaDescription.Json })
  @IsNotEmpty({
    message: i18n(`${SchemaI18n}.${SchemaDescription.Json}${ValidatorDescription.IsNotEmpty}`),
  })
  json: object;
}
