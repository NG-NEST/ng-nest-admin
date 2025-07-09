import { BaseOrder, SortOrder } from '@ui/core';

export class VariableOrderInput extends BaseOrder {
  code?: SortOrder;
  type?: SortOrder;
  sort?: SortOrder;
  source?: SortOrder;
  resourceId?: SortOrder;
  variableCategoryId?: SortOrder;
}
