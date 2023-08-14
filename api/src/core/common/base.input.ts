import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { IncludeDescription, SortOrder, WhereDescription } from './base.enum';
import { IsOptional, Max, Min } from 'class-validator';
import { BaseDescription, PaginationDescription } from './base.enum';
import { Type } from '@nestjs/common';

@InputType()
export class StringFilter {
  @Field(() => String, { description: WhereDescription.Equals })
  equals?: string;
  @Field(() => [String], { description: WhereDescription.In })
  in?: string[];
  @Field(() => [String], { description: WhereDescription.NotIn })
  notIn?: string[];
  @Field(() => String, { description: WhereDescription.Lt })
  lt?: string;
  @Field(() => String, { description: WhereDescription.Lte })
  lte?: string;
  @Field(() => String, { description: WhereDescription.Gt })
  gt?: string;
  @Field(() => String, { description: WhereDescription.Gte })
  gte?: string;
  @Field(() => String, { description: WhereDescription.Contains })
  contains?: string;
  @Field(() => String, { description: WhereDescription.StartsWith })
  startsWith?: string;
  @Field(() => String, { description: WhereDescription.EndsWith })
  endsWith?: string;
  @Field(() => String, { description: WhereDescription.Not })
  not?: string;
}

@InputType()
export class DateTimeFilter {
  @Field(() => Date, { description: WhereDescription.Equals })
  equals?: Date;
  @Field(() => [Date], { description: WhereDescription.In })
  in?: Date[];
  @Field(() => [Date], { description: WhereDescription.NotIn })
  notIn?: Date[];
  @Field(() => Date, { description: WhereDescription.Lt })
  lt?: Date;
  @Field(() => Date, { description: WhereDescription.Lte })
  lte?: Date;
  @Field(() => Date, { description: WhereDescription.Gt })
  gt?: Date;
  @Field(() => Date, { description: WhereDescription.Gte })
  gte?: Date;
  @Field(() => Date, { description: WhereDescription.Not })
  not?: Date;
}

@InputType()
export class NumberFilter {
  @Field(() => Number, { description: WhereDescription.Equals })
  equals?: number;
  @Field(() => [Number], { description: WhereDescription.In })
  in?: number[];
  @Field(() => [Number], { description: WhereDescription.NotIn })
  notIn?: number[];
  @Field(() => Number, { description: WhereDescription.Lt })
  lt?: number;
  @Field(() => Number, { description: WhereDescription.Lte })
  lte?: number;
  @Field(() => Number, { description: WhereDescription.Gt })
  gt?: number;
  @Field(() => Number, { description: WhereDescription.Gte })
  gte?: number;
  @Field(() => Number, { description: WhereDescription.Not })
  not?: number;
}

export const BaseStringFilter: Type<StringFilter> = StringFilter;
export const BaseDateTimeFilter: Type<DateTimeFilter> = DateTimeFilter;
export const BaseNumberFilter: Type<NumberFilter> = NumberFilter;

@InputType()
export class BaseOrder {
  @Field(() => SortOrder, { description: BaseDescription.CreatedAt, nullable: true })
  @IsOptional()
  createdAt?: SortOrder;

  @Field(() => SortOrder, { description: BaseDescription.UpdatedAt, nullable: true })
  @IsOptional()
  updatedAt?: SortOrder;
}

export function BaseInclude<Include>(TInclude: Type<Include>) {
  @InputType()
  class Input {
    @Field(() => TInclude, { description: IncludeDescription.Include, nullable: true })
    @IsOptional()
    include?: Include;
  }

  return Input;
}

export function BaseWhereInput<Where>(TWhere: Type<Where> | ObjectConstructor) {
  @InputType()
  class Input extends TWhere {
    @Field(() => [TWhere], { description: WhereDescription.AND, nullable: true })
    @IsOptional()
    AND?: Where[];
    @Field(() => [TWhere], { description: WhereDescription.OR, nullable: true })
    @IsOptional()
    OR?: Where[];
    @Field(() => [TWhere], { description: WhereDescription.NOT, nullable: true })
    @IsOptional()
    NOT?: Where[];
  }

  return Input;
}

@ArgsType()
export class Pagination {
  @Field(() => Int, { description: PaginationDescription.Skip, nullable: true, defaultValue: 0 })
  @IsOptional()
  @Min(0)
  skip?: number;

  @Field(() => Int, { description: PaginationDescription.Take, nullable: true, defaultValue: 10 })
  @IsOptional()
  @Min(1)
  @Max(100)
  take?: number;
}

export class PaginationWhere<Where> extends Pagination {
  where?: Where;
}

export class PaginationWhereOrder<Where, OrderBy> extends PaginationWhere<Where> {
  orderBy?: OrderBy[];
}

export class PaginationWhereOrderInclude<Where, OrderBy, Include> extends PaginationWhereOrder<Where, OrderBy> {
  include?: Include;
}

export function BasePaginationInput(): typeof Pagination;
export function BasePaginationInput<Where>(TWhere?: Type<Where>): typeof PaginationWhere<Where>;
export function BasePaginationInput<Where, OrderBy>(
  TWhere?: Type<Where>,
  TOrderBy?: Type<OrderBy>
): typeof PaginationWhereOrder<Where, OrderBy>;
export function BasePaginationInput<Where, OrderBy, Include>(
  TWhere?: Type<Where>,
  TOrderBy?: Type<OrderBy>,
  TInclude?: Type<Include>
): typeof PaginationWhereOrderInclude<Where, OrderBy, Include>;
export function BasePaginationInput<Where, OrderBy, Include>(
  TWhere?: Type<Where>,
  TOrderBy?: Type<OrderBy>,
  TInclude?: Type<Include>
):
  | typeof Pagination
  | typeof PaginationWhere<Where>
  | typeof PaginationWhereOrder<Where, OrderBy>
  | typeof PaginationWhereOrderInclude<Where, OrderBy, Include> {
  @ArgsType()
  class PaginationWhere extends Pagination {
    @Field(() => TWhere, { description: PaginationDescription.Where, nullable: true })
    @IsOptional()
    where?: Where;
  }

  @ArgsType()
  class PaginationWhereOrder extends PaginationWhere {
    @Field(() => [TOrderBy], { description: PaginationDescription.OrderBy, nullable: true })
    @IsOptional()
    orderBy?: OrderBy[];
  }

  @ArgsType()
  class PaginationWhereOrderInclude extends PaginationWhereOrder {
    @Field(() => TInclude, { description: PaginationDescription.Include, nullable: true })
    @IsOptional()
    include?: Include;
  }

  if (!TWhere && !TOrderBy && !TInclude) {
    return Pagination;
  } else if (TWhere && !TOrderBy && !TInclude) {
    return PaginationWhere;
  } else if (TWhere && TOrderBy && !TInclude) {
    return PaginationWhereOrder;
  } else if (TWhere && TOrderBy && TInclude) {
    return PaginationWhereOrderInclude;
  }
}

export function BaseCreateWithoutInput<CreateWithout>(TCreateWithout: Type<CreateWithout>) {
  @InputType()
  class Input {
    @Field(() => [TCreateWithout], { nullable: true })
    @IsOptional()
    create?: CreateWithout[];
  }

  return Input;
}
