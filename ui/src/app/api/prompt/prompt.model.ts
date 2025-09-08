import { BaseModel } from '@ui/core';

export class Prompt extends BaseModel {
  name!: string;
  user!: string;
  system?: string;
  modelType!: string;
  modelId!: string;
  userVars?: any[];
  description?: string;
}
