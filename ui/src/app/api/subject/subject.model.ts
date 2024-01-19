import { BaseModel } from '@ui/core';

export class Subject extends BaseModel {
  name!: string;
  code!: string;
  description?: string;
}
