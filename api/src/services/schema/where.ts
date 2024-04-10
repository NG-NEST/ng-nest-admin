import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { BASE_STRING_FILTER, BaseWhereInput, StringFilter } from '@api/core';
import { SchemaDescription } from './schema.enum';

@InputType()
export class SchemaWhere {
  @Field(() => BASE_STRING_FILTER, { description: SchemaDescription.Name, nullable: true })
  @IsOptional()
  name?: StringFilter;

  @Field(() => BASE_STRING_FILTER, { description: SchemaDescription.Code, nullable: true })
  @IsOptional()
  code?: StringFilter;
}

@InputType()
export class SchemaWhereInput extends BaseWhereInput(SchemaWhere) {}
