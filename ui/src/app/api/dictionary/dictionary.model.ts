import { BaseAudit } from '@ui/core';

export class Dictionary extends BaseAudit {
  id!: string;
  pid?: string;
  parent?: Dictionary;
  children?: Dictionary[];
  name!: string;
  code!: string;
  sort!: number;
  description?: string;
}
