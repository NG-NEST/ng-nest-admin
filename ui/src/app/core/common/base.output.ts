export interface BasePagination<T> {
  data: Array<T>;
  count?: number;
}

export class BasePaginationOutput<T> implements BasePagination<T> {
  data!: Array<T>;
  count?: number;
}

export type JsonValue = string | number | boolean | JsonObject | JsonArray | null;

export type JsonObject = {
  [Key in string]?: JsonValue;
};

export interface JsonArray extends Array<JsonValue> {}
