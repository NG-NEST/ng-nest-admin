import { BaseModel } from '@ui/core';
import { Permission } from '../permission';

export class Resource extends BaseModel {
  pid?: string;
  name!: string;
  code!: string;
  sort!: number;
  description?: string;
  permissions?: Permission[];
  subject!: ResourceSubject;
  subjectId!: string;
  subjectName!: string;
  parent?: Resource;
  parentName?: string;
}

export class ResourceSubject {
  id!: string;
  name!: string;
}
