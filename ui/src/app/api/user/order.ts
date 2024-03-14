import { BaseOrder, SortOrder } from '@ui/core';

export class UserOrderInput extends BaseOrder {
  name?: SortOrder;
  account?: SortOrder;
  email?: SortOrder;
  phone?: SortOrder;
}
