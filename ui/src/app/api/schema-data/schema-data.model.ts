import { BaseAudit } from '@ui/core';
import { Schema } from '../schema/schema.model';

export class SchemaData extends BaseAudit {
  id!: string;
  data!: string;
  schemaId!: string;
  schema!: Schema;
  formId?: string;
}
