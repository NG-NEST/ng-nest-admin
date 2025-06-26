import { BaseModel } from '@ui/core';
import { Permission } from '../permission';

export class Resource extends BaseModel {
  pid?: string;
  type?: string;
  icon?: string;
  name!: string;
  code!: ResourceCode;
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

export type ResourceCode = string | number | boolean;
