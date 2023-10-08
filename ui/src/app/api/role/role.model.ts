import { BaseAudit, BaseModel } from '@ui/core';
import { User } from '../user';

export class Role extends BaseModel {
  name!: string;
  description?: string;
  users?: RoleUser[];
}

export class RoleUser extends BaseAudit {
  userId?: string;
  user?: User;
}
