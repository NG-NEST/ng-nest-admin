import { BaseOrder, SortOrder } from '@ui/core';

export class ResourceOrderInput extends BaseOrder {
  type?: SortOrder;
  icon?: SortOrder;
  name?: SortOrder;
  code?: SortOrder;
  sort?: SortOrder;
  subjectId?: SortOrder;
}
