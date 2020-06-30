import { XId } from './id.interface';

export interface XResultList<Entity extends XId> {
  list?: Entity[];
  total?: number;
  query?: XQuery;
}

export interface XQuery {
  sort?: XSort[];
  filter?: XFilter[];
  group?: string;
}

export interface XFilter {
  field: string;
  value: string;
  operation?: XOperation;
  relation?: string;
}

export type XOperation = '%' | '=' | '>' | '>=' | '<' | '<=' | '';

export interface XSort extends XFilter {}

export interface XGroupItem extends XId {
  [prototype: string]: any;
  count?: number;
}
