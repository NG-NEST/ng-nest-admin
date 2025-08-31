import { BaseAudit, BaseModel } from '@ui/core';

export class Role extends BaseModel {
  name: string;
  user: string;
  system?: string;
  modelId: string;
  userVars?: any[];
  description?: string;
}


