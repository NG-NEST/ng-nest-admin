import { BaseWhereInput, NumberFilter, StringFilter, JsonFilter } from '@ui/core';
import { ResourceWhereInput } from '../resource/where';
import { VariableCategoryWhereInput } from '../variable-category';

export class VariableWhereInput extends BaseWhereInput<VariableWhereInput> {
  code?: string | StringFilter;
  type?: string | StringFilter;
  value?: JsonFilter;
  sort?: number | NumberFilter;
  description?: string | StringFilter;
  resourceId?: string | StringFilter;
  resource?: ResourceWhereInput;
  variableCategoryId?: string | StringFilter;
  variableCategory?: VariableCategoryWhereInput;
}
