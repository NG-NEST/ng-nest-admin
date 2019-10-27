export interface ResultList<T> {
  list: T[];
  total?: number;
  query?: Query;
}

export interface Query {
  size: number;
  index: number;
  sort?: string[];
  filter?: Filter[];
}

export interface Filter {
  field: string;
  value: string | number;
}
