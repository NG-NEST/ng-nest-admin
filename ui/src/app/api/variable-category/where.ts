import { BaseWhereInput, NumberFilter, StringFilter } from '@ui/core';
import { ResourceWhereInput } from '../resource/where';

export class VariableCategoryWhereInput extends BaseWhereInput<VariableCategoryWhereInput> {
  name?: string | StringFilter;
  code?: string | StringFilter;
  sort?: number | NumberFilter;
  description?: string | StringFilter;
  resourceId?: string | StringFilter;
  resource?: ResourceWhereInput;
}
