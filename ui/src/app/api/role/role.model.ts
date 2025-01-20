import { BaseAudit, BaseModel } from '@ui/core';
import { User } from '../user';
import { Permission } from '../permission';

export class RolePermission {
  permissionId?: string;
  permission?: Permission;
}

export class Role extends BaseModel {
  name!: string;
  description?: string;
  permissions?: RolePermission[];
}

export class RoleUser extends BaseAudit {
  userId?: string;
  user?: User;
}
