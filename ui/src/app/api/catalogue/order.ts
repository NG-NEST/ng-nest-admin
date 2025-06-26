import { BaseOrder, SortOrder } from '@ui/core';

export class CatalogueOrderInput extends BaseOrder {
  name?: SortOrder;
  type?: SortOrder;
  sort?: SortOrder;
  many?: SortOrder;
  resourceId?: SortOrder;
  variableId?: SortOrder;
}
