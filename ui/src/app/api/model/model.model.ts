import { BaseModel } from '@ui/core';

export class Model extends BaseModel {
  name!: string;
  type!: string;
  description?: string;
}
