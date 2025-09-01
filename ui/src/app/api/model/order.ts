import { BaseOrder, SortOrder } from '@ui/core';

export class ModelOrderInput extends BaseOrder {
  name?: SortOrder;
  type?: SortOrder;
  description?: SortOrder;
}
