import { BaseModel } from '@ui/core';

export class Prompt extends BaseModel {
  name!: string;
  prompt!: string;
  system?: string;
  code!: string;
  platform!: string;
  promptVars?: any[];
  description?: string;
}
