import { BaseModel } from '@ui/core';

export class Model extends BaseModel {
  name!: string;
  code!: string;
  platform!: string;
  description?: string;
}
