import { BaseAudit, JsonValue } from '@ui/core';

export class Schema extends BaseAudit {
  id!: string;
  name!: string;
  code!: string;
  description?: string;
  version?: string;
  json!: JsonValue;
}
