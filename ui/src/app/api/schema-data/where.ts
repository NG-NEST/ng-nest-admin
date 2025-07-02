import { BaseWhereInput, JsonFilter, StringFilter } from '@ui/core';
import { SchemaWhereInput } from '../schema/where';

export class SchemaDataWhereInput extends BaseWhereInput<SchemaDataWhereInput> {
  data?: JsonFilter;
  schemaId?: string | StringFilter;
  formId?: string | StringFilter;
  schema?: SchemaWhereInput;
}
