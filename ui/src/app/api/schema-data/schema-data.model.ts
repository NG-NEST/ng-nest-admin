import { BaseAudit, JsonValue } from '@ui/core';
import { Schema } from '../schema/schema.model';

export class SchemaData extends BaseAudit {
  id!: string;
  data!: JsonValue;
  schemaId!: string;
  schema!: Schema;
}
