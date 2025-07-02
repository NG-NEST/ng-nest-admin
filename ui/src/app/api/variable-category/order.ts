import { BaseOrder, SortOrder } from '@ui/core';

export class VariableCategoryOrderInput extends BaseOrder {
  name?: SortOrder;
  code?: SortOrder;
  sort?: SortOrder;
  resourceId?: SortOrder;
}
