import { JsonValue } from '@ui/core';

export class VariableUpdateInput {
  id!: string;
  code!: string;
  type?: string;
  value?: JsonValue;
  source?: string;
  sort?: number;
  description?: string;
}
