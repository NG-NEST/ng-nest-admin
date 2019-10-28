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
  group?: string;
}

export interface GroupItem {
  [prototype: string]: any;
  count?: number;
}

export interface Filter {
  field: string;
  value: string | number;
}
