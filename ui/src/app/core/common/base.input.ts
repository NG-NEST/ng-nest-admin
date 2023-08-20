import { Type } from '@angular/core';
import { SortOrder } from './base.enum';

export class StringFilter {
  equals?: string;
  in?: string[];
  notIn?: string[];
  lt?: string;
  lte?: string;
  gt?: string;
  gte?: string;
  contains?: string;
  startsWith?: string;
  endsWith?: string;
  not?: string;
}

export class DateTimeFilter {
  equals?: Date;
  in?: Date[];
  notIn?: Date[];
  lt?: Date;
  lte?: Date;
  gt?: Date;
  gte?: Date;
  not?: Date;
}

export class NumberFilter {
  equals?: number;
  in?: number[];
  notIn?: number[];
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
  not?: number;
}

export class BaseOrder {
  createdAt?: SortOrder;
  updatedAt?: SortOrder;
}

export class BaseWhereInput<Where> {
  AND?: Where[] | Where;
  OR?: Where[] | Where;
  NOT?: Where[] | Where;
}

export class Pagination {
  skip?: number;
  take?: number;
}

export class PaginationWhere<Where> extends Pagination {
  where?: Where;
}

export class PaginationWhereOrder<Where, OrderBy> extends PaginationWhere<Where> {
  orderBy?: OrderBy[] | OrderBy;
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
  class PaginationWhere extends Pagination {
    where?: Where;
  }

  class PaginationWhereOrder extends PaginationWhere {
    orderBy?: OrderBy[] | OrderBy;
  }

  class PaginationWhereOrderInclude extends PaginationWhereOrder {
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
  } else {
    return Pagination;
  }
}

export class BaseCreateWithoutInput<CreateWithout> {
  create?: CreateWithout[];
}
