import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { SortOrder } from './base.enum';
import { IsOptional, Max, Min } from 'class-validator';
import { BaseDescription, PaginationDescription } from './base.enum';
import { Type } from '@nestjs/common';

export interface Constructor<T> {
  new (): T;
}

@InputType()
export class StringFilter {
  @Field(() => String)
  equals?: string;
  @Field(() => [String])
  in?: string[];
  @Field(() => [String])
  notIn?: string[];
  @Field(() => String)
  lt?: string;
  @Field(() => String)
  lte?: string;
  @Field(() => String)
  gt?: string;
  @Field(() => String)
  gte?: string;
  @Field(() => String)
  contains?: string;
  @Field(() => String)
  startsWith?: string;
  @Field(() => String)
  endsWith?: string;
  @Field(() => String)
  not?: string;
}

export const BaseString: Type<StringFilter> = StringFilter;

@InputType()
export class BaseOrder {
  @Field(() => SortOrder, { description: BaseDescription.CreatedAt, nullable: true })
  @IsOptional()
  createdAt?: SortOrder;

  @Field(() => SortOrder, { description: BaseDescription.UpdatedAt, nullable: true })
  @IsOptional()
  updatedAt?: SortOrder;
}

export function BaseWhere<Where>(TWhere: Type<Where> | Constructor<Where>) {
  @InputType()
  class Input extends TWhere {
    @Field(() => [TWhere], { nullable: true })
    @IsOptional()
    AND?: Where[];
    @Field(() => [TWhere], { nullable: true })
    @IsOptional()
    OR?: Where[];
    @Field(() => [TWhere], { nullable: true })
    @IsOptional()
    NOT?: Where[];
  }

  return Input;
}

export function BasePaginationInput<OrderBy, Where>(TOrderBy: Type<OrderBy>, TWhere: Type<Where>) {
  @ArgsType()
  class Input {
    @Field(() => Int, { description: PaginationDescription.Skip, nullable: true, defaultValue: 0 })
    @IsOptional()
    @Min(0)
    skip?: number;

    @Field(() => Int, { description: PaginationDescription.Take, nullable: true, defaultValue: 10 })
    @IsOptional()
    @Min(1)
    @Max(100)
    take?: number;

    @Field(() => [TOrderBy], { description: PaginationDescription.OrderBy, nullable: true })
    @IsOptional()
    orderBy?: OrderBy[];

    @Field(() => TWhere, { description: PaginationDescription.Where, nullable: true })
    @IsOptional()
    where?: Where;
  }
  return Input;
}
