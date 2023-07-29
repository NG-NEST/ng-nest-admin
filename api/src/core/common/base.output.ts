import { Type } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PaginationDescription as PDes } from './base.enum';

export function BasePaginationOutput<TItem>(TClass: Type<TItem>) {
  @ObjectType({ isAbstract: true })
  abstract class Output {
    @Field(() => [TClass], { description: PDes.Data })
    data: Array<TItem>;

    @Field(() => Int, { description: PDes.Count, nullable: true, defaultValue: 0 })
    count?: number;
  }
  return Output;
}
