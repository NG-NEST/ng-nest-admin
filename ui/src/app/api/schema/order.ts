import { BaseOrder, SortOrder } from '@ui/core';

export class SchemaOrderInput extends BaseOrder {
  name?: SortOrder;
  code?: SortOrder;
}
