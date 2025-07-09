import { JsonValue } from '@ui/core';

export class VariableCreateInput {
  code!: string;
  type?: string;
  value?: JsonValue;
  source?: string;
  sort?: number;
  description?: string;
  resourceId!: string;
  variableCategoryId!: string;
}
