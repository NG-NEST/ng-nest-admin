import { ID } from '@nestjs/graphql';
export const VARIABLE_CATEGORY_I18N = 'variable-category';

export enum VariableCategoryAuth {
  VariableCategoryCreate = 'variable-category-create',
  VariableCategoryUpdate = 'variable-category-update',
  VariableCategoryDelete = 'variable-category-delete',
}

export enum VariableCategoryDescription {
  VariableCategory = 'VariableCategory',

  Id = 'VariableCategoryId',
  Name = 'Name',
  Code = 'Code',
  Description = 'Description',
}

export enum VariableCategoryResolverName {
  VariableCategory = 'VariableCategory',
  VariableCategorys = 'VariableCategorys',
  VariableCategorySelect = 'VariableCategorySelect. No Pagination',
  CreateVariableCategory = 'CreateVariableCategory',
  UpdateVariableCategory = 'UpdateVariableCategory',
  DeleteVariableCategory = 'DeleteVariableCategory',
}

export enum VariableCategoryCache {
  VariableCategory = 'VariableCategory',
  VariableCategorys = 'VariableCategorys',
  VariableCategorySelect = 'VariableCategorySelect',
}

export enum VariableCategoryException {}

export const VariableCategoryCacheClear = Object.keys(VariableCategoryCache);

export const VariableCategoryId = { type: () => ID, description: VariableCategoryDescription.Id };
