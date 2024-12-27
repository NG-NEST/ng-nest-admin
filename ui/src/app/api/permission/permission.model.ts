import { BaseAudit } from '@ui/core';

export class Permission extends BaseAudit {
  id!: string;
  name!: string;
  code!: string;
  sort!: number;
  description?: string;
  resourceId?: string;
}
