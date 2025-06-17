import { ID } from '@nestjs/graphql';
export const VARIABLE_I18N = 'variable';

export enum VariableAuth {
  VariableCreate = 'variable-create',
  VariableUpdate = 'variable-update',
  VariableDelete = 'variable-delete',
}

export enum VariableDescription {
  Variable = 'Variable',

  Id = 'VariableId',
  Code = 'Code',
  Type = 'Type',
  Value = 'Value',
  Description = 'Description',
}

export enum VariableResolverName {
  Variable = 'Variable',
  Variables = 'Variables',
  VariableSelect = 'VariableSelect. No Pagination',
  CreateVariable = 'CreateVariable',
  UpdateVariable = 'UpdateVariable',
  DeleteVariable = 'DeleteVariable',
}

export enum VariableCache {
  Variable = 'Variable',
  Variables = 'Variables',
  VariableSelect = 'VariableSelect',
}

export enum VariableException {}

export const VariableCacheClear = Object.keys(VariableCache);

export const VariableId = { type: () => ID, description: VariableDescription.Id };
