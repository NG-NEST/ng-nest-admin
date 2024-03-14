import { BaseOrder, SortOrder } from '@ui/core';

export class SubjectOrderInput extends BaseOrder {
  name?: SortOrder;
  code?: SortOrder;
  description?: SortOrder;
}
