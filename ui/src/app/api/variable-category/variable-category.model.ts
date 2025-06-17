import { BaseModel } from '@ui/core';

export class VariableCategory extends BaseModel {
  name!: string;
  code!: string;
  description?: string;
  resource!: VariableCategoryResource;
  resourceId!: string;
}

export class VariableCategoryResource {
  id!: string;
  name!: string;
}
