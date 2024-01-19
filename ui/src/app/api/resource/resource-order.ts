import { BaseOrder, SortOrder } from '@ui/core';

export class ResourceOrderInput extends BaseOrder {
  name?: SortOrder;
  code?: SortOrder;
  subjectId?: SortOrder;
}
