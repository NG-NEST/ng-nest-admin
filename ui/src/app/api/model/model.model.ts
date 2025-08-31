import { BaseAudit, BaseModel } from '@ui/core';

export class Role extends BaseModel {
  name: string;
  type: string;
  description?: string;
}


