import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { IncludeDescription, SortOrder, WhereDescription } from './base.enum';
import { IsOptional, Max, Min } from 'class-validator';
import { BaseDescription, PaginationDescription } from './base.enum';
import { Type } from '@nestjs/common';
import { GraphQLJSON } from 'graphql-scalars';
import { JsonValue } from '@prisma/client/runtime/library';

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
export class EnumFilter<Enum> {
  @Field(() => String, { description: WhereDescription.Equals })
  equals?: Enum;
  @Field(() => [String], { description: WhereDescription.In })
  in?: Enum[];
  @Field(() => [String], { description: WhereDescription.NotIn })
  notIn?: Enum[];
  @Field(() => String, { description: WhereDescription.Lt })
  lt?: Enum;
  @Field(() => String, { description: WhereDescription.Lte })
  lte?: Enum;
  @Field(() => String, { description: WhereDescription.Gt })
  gt?: Enum;
  @Field(() => String, { description: WhereDescription.Gte })
  gte?: Enum;
  @Field(() => String, { description: WhereDescription.Contains })
  contains?: Enum;
  @Field(() => String, { description: WhereDescription.StartsWith })
  startsWith?: Enum;
  @Field(() => String, { description: WhereDescription.EndsWith })
  endsWith?: Enum;
  @Field(() => String, { description: WhereDescription.Not })
  not?: Enum;
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

@InputType()
export class BooleanFilter {
  @Field(() => Boolean, { description: WhereDescription.Equals })
  equals?: boolean;
  @Field(() => Boolean, { description: WhereDescription.Not })
  not?: boolean;
}

@InputType()
export class JsonFilter {
  @Field(() => GraphQLJSON, { description: WhereDescription.Equals })
  equals?: JsonValue;
  @Field(() => [String], { description: WhereDescription.Path })
  path?: string[];
  @Field(() => String, { description: WhereDescription.Mode })
  mode?: 'default' | 'insensitive';
  @Field(() => GraphQLJSON, { description: WhereDescription.Lt })
  lt?: JsonValue;
  @Field(() => GraphQLJSON, { description: WhereDescription.Lte })
  lte?: JsonValue;
  @Field(() => GraphQLJSON, { description: WhereDescription.Gt })
  gt?: JsonValue;
  @Field(() => GraphQLJSON, { description: WhereDescription.Gte })
  gte?: JsonValue;
  @Field(() => String, { description: WhereDescription.Contains })
  string_contains?: string;
  @Field(() => String, { description: WhereDescription.StartsWith })
  string_starts_with?: string;
  @Field(() => String, { description: WhereDescription.EndsWith })
  string_ends_with?: string;
  @Field(() => GraphQLJSON, { description: WhereDescription.ArrayContains })
  array_contains?: JsonValue;
  @Field(() => GraphQLJSON, { description: WhereDescription.ArrayStartsWith })
  array_starts_with?: JsonValue;
  @Field(() => GraphQLJSON, { description: WhereDescription.ArrayEndsWith })
  array_ends_with?: JsonValue;
  @Field(() => GraphQLJSON, { description: WhereDescription.Not })
  not?: JsonValue;
}

export const BASE_STRING_FILTER: Type<StringFilter> = StringFilter;
export const BASE_DATETIME_FILTER: Type<DateTimeFilter> = DateTimeFilter;
export const BASE_NUMBER_FILTER: Type<NumberFilter> = NumberFilter;
export const BASE_BOOLEAN_FILTER: Type<BooleanFilter> = BooleanFilter;
export const BASE_JSON_FILTER: Type<JsonFilter> = JsonFilter;

@InputType()
export class BaseOrder {
  @Field(() => SortOrder, { description: BaseDescription.CreatedAt, nullable: true })
  @IsOptional()
  createdAt?: SortOrder;

  @Field(() => SortOrder, { description: BaseDescription.UpdatedAt, nullable: true })
  @IsOptional()
  updatedAt?: SortOrder;
}

export interface BaseSelect {
  select?: { [property: string]: BaseSelect };
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

export class PaginationWhereOrderInclude<Where, OrderBy, Include> extends PaginationWhereOrder<
  Where,
  OrderBy
> {
  include?: Include;
}

export function BasePaginationInput(): typeof Pagination;
export function BasePaginationInput<Where>(TWhere?: Type<Where>): typeof PaginationWhere<Where>;
export function BasePaginationInput<Where, OrderBy>(
  TWhere?: Type<Where>,
  TOrderBy?: Type<OrderBy>,
): typeof PaginationWhereOrder<Where, OrderBy>;
export function BasePaginationInput<Where, OrderBy, Include>(
  TWhere?: Type<Where>,
  TOrderBy?: Type<OrderBy>,
  TInclude?: Type<Include>,
): typeof PaginationWhereOrderInclude<Where, OrderBy, Include>;
export function BasePaginationInput<Where, OrderBy, Include>(
  TWhere?: Type<Where>,
  TOrderBy?: Type<OrderBy>,
  TInclude?: Type<Include>,
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
  return Pagination;
}

@ArgsType()
export class Select {}

export class SelectWhere<Where> {
  where?: Where;
}

export class SelectWhereOrder<Where, OrderBy> extends SelectWhere<Where> {
  orderBy?: OrderBy[];
}

export class SelectWhereOrderInclude<Where, OrderBy, Include> extends SelectWhereOrder<
  Where,
  OrderBy
> {
  include?: Include;
}

export function BaseSelectInput(): typeof Select;
export function BaseSelectInput<Where>(TWhere?: Type<Where>): typeof SelectWhere;
export function BaseSelectInput<Where, OrderBy>(
  TWhere?: Type<Where>,
  TOrderBy?: Type<OrderBy>,
): typeof SelectWhereOrder<Where, OrderBy>;
export function BaseSelectInput<Where, OrderBy, Include>(
  TWhere?: Type<Where>,
  TOrderBy?: Type<OrderBy>,
  TInclude?: Type<Include>,
): typeof SelectWhereOrderInclude<Where, OrderBy, Include>;
export function BaseSelectInput<Where, OrderBy, Include>(
  TWhere?: Type<Where>,
  TOrderBy?: Type<OrderBy>,
  TInclude?: Type<Include>,
):
  | typeof SelectWhere<Where>
  | typeof SelectWhereOrder<Where, OrderBy>
  | typeof SelectWhereOrderInclude<Where, OrderBy, Include> {
  @ArgsType()
  class SelectWhere {
    @Field(() => TWhere, { description: PaginationDescription.Where, nullable: true })
    @IsOptional()
    where?: Where;
  }
  @ArgsType()
  class SelectWhereOrder {
    @Field(() => TWhere, { description: PaginationDescription.Where, nullable: true })
    @IsOptional()
    where?: Where;
    @Field(() => [TOrderBy], { description: PaginationDescription.OrderBy, nullable: true })
    @IsOptional()
    orderBy?: OrderBy[];
  }

  @ArgsType()
  class SelectWhereOrderInclude {
    @Field(() => TWhere, { description: PaginationDescription.Where, nullable: true })
    @IsOptional()
    where?: Where;
    @Field(() => [TOrderBy], { description: PaginationDescription.OrderBy, nullable: true })
    @IsOptional()
    orderBy?: OrderBy[];
    @Field(() => TInclude, { description: PaginationDescription.Include, nullable: true })
    @IsOptional()
    include?: Include;
  }
  if (!TWhere && !TOrderBy && !TInclude) {
    return Select;
  } else if (TWhere && !TOrderBy && !TInclude) {
    return SelectWhere;
  } else if (TWhere && TOrderBy && !TInclude) {
    return SelectWhereOrder;
  } else if (TWhere && TOrderBy && TInclude) {
    return SelectWhereOrderInclude;
  }

  return Select;
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
