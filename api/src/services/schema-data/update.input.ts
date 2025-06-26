import { Field, ID, InputType } from '@nestjs/graphql';
import { IsJSON, IsNotEmpty } from 'class-validator';
import { ValidatorDescription, I18N, IsNotExist } from '@api/core';
import { SchemaDataDescription, SCHEMA_DATA_I18N } from './schema-data.enum';
import { GraphQLJSON } from 'graphql-scalars';
import { JsonValue } from '@prisma/client/runtime/library';
import { SchemaDescription } from '../schema';

@InputType()
export class SchemaDataUpdateInput {
  @Field(() => ID, { description: SchemaDataDescription.Id })
  @IsNotEmpty({
    message: I18N(
      `${SCHEMA_DATA_I18N}.${SchemaDataDescription.Id}${ValidatorDescription.IsNotEmpty}`,
    ),
  })
  id: string;

  @Field(() => GraphQLJSON, { description: SchemaDataDescription.Data })
  @IsNotEmpty({
    message: I18N(
      `${SCHEMA_DATA_I18N}.${SchemaDataDescription.Data}${ValidatorDescription.IsNotEmpty}`,
    ),
  })
  @IsJSON()
  data: JsonValue;

  @Field({ description: SchemaDescription.Id })
  @IsNotEmpty({
    message: I18N(`${SCHEMA_DATA_I18N}.${SchemaDescription.Id}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsNotExist('schema', {
    message: I18N(`${SCHEMA_DATA_I18N}.${SchemaDescription.Id}${ValidatorDescription.IsNotExist}`),
    context: { relation: 'id' },
  })
  schemaId: string;
}
