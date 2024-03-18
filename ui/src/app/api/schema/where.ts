import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { BaseStringFilter, BaseWhereInput, StringFilter } from '@api/core';
import { SchemaDescription } from './schema.enum';

@InputType()
export class SchemaWhere {
  @Field(() => BaseStringFilter, { description: SchemaDescription.Name, nullable: true })
  @IsOptional()
  name?: StringFilter;

  @Field(() => BaseStringFilter, { description: SchemaDescription.Code, nullable: true })
  @IsOptional()
  code?: StringFilter;
}

@InputType()
export class SchemaWhereInput extends BaseWhereInput(SchemaWhere) {}
