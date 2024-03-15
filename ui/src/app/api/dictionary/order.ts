import { BaseOrder, SortOrder } from '@ui/core';

export class DictionaryOrderInput extends BaseOrder {
  name?: SortOrder;
  code?: SortOrder;
  sort?: SortOrder;
}
