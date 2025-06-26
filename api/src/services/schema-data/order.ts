import { BaseOrder, SortOrder } from '@api/core';
import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { SchemaDescription, SchemaOrderInput } from '../schema';

@InputType()
export class SchemaDataOrderInput extends BaseOrder {
  @Field(() => SortOrder, { description: SchemaDescription.Id, nullable: true })
  @IsOptional()
  schemaId?: SortOrder;

  @Field(() => SortOrder, { description: SchemaDescription.Schema, nullable: true })
  @IsOptional()
  schema?: SchemaOrderInput;
}
