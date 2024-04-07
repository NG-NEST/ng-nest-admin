import { BaseWhereInput, StringFilter } from '@ui/core';

export class SchemaWhere {
  name?: StringFilter;
  code?: StringFilter;
}

export class SchemaWhereInput extends BaseWhereInput<SchemaWhere> {}
