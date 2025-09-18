import { BaseOrder, SortOrder } from '@ui/core';

export class ModelOrderInput extends BaseOrder {
  name?: SortOrder;
  code?: SortOrder;
  platform?: SortOrder;
  description?: SortOrder;
}
