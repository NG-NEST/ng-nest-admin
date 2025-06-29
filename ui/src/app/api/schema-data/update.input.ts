import { JsonValue } from '@ui/core';

export class SchemaDataUpdateInput {
  id!: string;
  data?: JsonValue;
  schemaId?: string;
}
