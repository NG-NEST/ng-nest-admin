import { BaseModel } from '@ui/core';
import { VariableCategory } from '../variable-category';
import { Resource } from '../resource';

export class Variable extends BaseModel {
  code!: string;
  type?: string;
  value?: string;
  sort?: number;
  description?: string;
  resource!: VariableResource;
  resourceId!: string;
  variableCategory!: VariableVariableCategory;
  variableCategoryId!: string;
}

export class VariableResource extends Resource {}

export class VariableVariableCategory extends VariableCategory {}
