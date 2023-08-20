export interface BasePagination<T> {
  data: Array<T>;
  count?: number;
}

export class BasePaginationOutput<T> implements BasePagination<T> {
  data!: Array<T>;
  count?: number;
}
