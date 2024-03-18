import { BaseAudit } from '@ui/core';

export class Schema extends BaseAudit {
  id!: string;
  name!: string;
  code!: string;
  json!: object;
}
