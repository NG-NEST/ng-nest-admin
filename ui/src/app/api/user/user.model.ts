import { BaseAudit, BaseModel } from '@ui/core';
import { Role } from '../role/role.model';

export class User extends BaseModel {
  name!: string;
  account!: string;
  email!: string;
  phone?: string;
  roles?: UserRole[];
}

export class UserRole extends BaseAudit {
  roleId?: string;
  role?: Role;
}
