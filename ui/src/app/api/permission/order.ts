import { BaseOrder, SortOrder } from '@ui/core';

export class PermissionOrderInput extends BaseOrder {
  name?: SortOrder;
  code?: SortOrder;
  sort?: SortOrder;
  description?: SortOrder;
}
