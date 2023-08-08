import type { ApolloQueryResult } from '@apollo/client/core';

export interface BaseResult<T> extends ApolloQueryResult<T> {}

export interface BaseModel {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BasePaginationOutput<T> {
  data?: Array<T>;
  count?: number;
}

export type SortOrder = 'asc' | 'desc';

export interface BaseOrder {
  createdAt?: SortOrder;
  updatedAt?: SortOrder;
}

export interface BaseWhere<Where> {
  AND?: Where[] | Where;
  OR?: Where[] | Where;
  NOT?: Where[] | Where;
}

export interface BasePaginationInput<OrderBy, Where> {
  skip?: number;
  take?: number;
  orderBy?: OrderBy[] | OrderBy;
  where?: Where;
}
