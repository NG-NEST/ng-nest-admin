import { BaseWhereInput, StringFilter } from '@ui/core';
import { ResourceWhereInput } from '../resource/where';

export class VariableCategoryWhereInput extends BaseWhereInput<VariableCategoryWhereInput> {
  name?: string | StringFilter;
  code?: string | StringFilter;
  description?: string | StringFilter;
  resourceId?: string | StringFilter;
  resource?: ResourceWhereInput;
}
