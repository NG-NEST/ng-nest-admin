import { Field, InputType } from '@nestjs/graphql';
import { IsJSON, IsNotEmpty } from 'class-validator';
import { IsNotExist, ValidatorDescription, I18N } from '@api/core';
import { SchemaDataDescription, SCHEMA_DATA_I18N } from './schema-data.enum';
import { SchemaDescription } from '../schema';
import { GraphQLJSON } from 'graphql-scalars';
import { JsonValue } from '@prisma/client/runtime/library';

@InputType()
export class SchemaDataCreateInput {
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
