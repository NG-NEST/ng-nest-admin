import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import {
  BASE_JSON_FILTER,
  BASE_STRING_FILTER,
  BaseWhereInput,
  JsonFilter,
  StringFilter,
} from '@api/core';
import { SchemaDataDescription } from './schema-data.enum';
import { SchemaDescription, SchemaWhereInput } from '../schema';

@InputType()
export class SchemaDataWhere {
  @Field(() => BASE_JSON_FILTER, { description: SchemaDataDescription.Data, nullable: true })
  @IsOptional()
  data?: JsonFilter;

  @Field(() => BASE_STRING_FILTER, { description: SchemaDescription.Id, nullable: true })
  @IsOptional()
  schemaId?: StringFilter;

  @Field(() => SchemaWhereInput, { description: SchemaDescription.Schema, nullable: true })
  @IsOptional()
  schema?: SchemaWhereInput;
}

@InputType()
export class SchemaDataWhereInput extends BaseWhereInput(SchemaDataWhere) {}
