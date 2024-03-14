import { BaseOrder, SortOrder } from '@api/core';
import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { SchemaDescription } from './schema.enum';

@InputType()
export class SchemaOrderInput extends BaseOrder {
  @Field(() => SortOrder, { description: SchemaDescription.Name, nullable: true })
  @IsOptional()
  name?: SortOrder;

  @Field(() => SortOrder, { description: SchemaDescription.Code, nullable: true })
  @IsOptional()
  code?: SortOrder;
}
