import { BaseAudit, BaseModel } from '@ui/core';
import { User } from '../user';

export class Subject extends BaseModel {
  name!: string;
  description?: string;
}

export class SubjectUser extends BaseAudit {
  userId?: string;
  user?: User;
}
