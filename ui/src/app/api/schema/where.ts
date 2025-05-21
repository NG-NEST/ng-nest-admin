import { BaseWhereInput, StringFilter } from '@ui/core';

export class SchemaWhereInput extends BaseWhereInput<SchemaWhereInput> {
  name?: string | StringFilter;
  code?: string | StringFilter;
}
