import { BaseOrder, SortOrder } from '@api/core';
import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { DictionaryDescription } from './dictionary.enum';

@InputType()
export class DictionaryOrderInput extends BaseOrder {
  @Field(() => SortOrder, { description: DictionaryDescription.Name, nullable: true })
  @IsOptional()
  name?: SortOrder;

  @Field(() => SortOrder, { description: DictionaryDescription.Code, nullable: true })
  @IsOptional()
  code?: SortOrder;

  @Field(() => SortOrder, { description: DictionaryDescription.Sort, nullable: true })
  @IsOptional()
  sort?: SortOrder;
}
