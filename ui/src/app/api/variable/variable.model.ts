import { BaseModel } from '@ui/core';

export class Variable extends BaseModel {
  code!: string;
  type?: string;
  value?: string;
  description?: string;
  resource!: VariableResource;
  resourceId!: string;
  variableCategory!: VariableVariableCategory;
  variableCategoryId!: string;
}

export class VariableResource {
  id!: string;
  name!: string;
}

export class VariableVariableCategory {
  id!: string;
  name!: string;
}
