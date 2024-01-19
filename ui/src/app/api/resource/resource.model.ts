import { BaseModel } from '@ui/core';

export class Resource extends BaseModel {
  pid?: string;
  name!: string;
  code!: string;
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
