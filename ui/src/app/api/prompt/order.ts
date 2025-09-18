import { BaseOrder, SortOrder } from '@ui/core';

export class PromptOrderInput extends BaseOrder {
  name?: SortOrder;
  prompt?: SortOrder;
  system?: SortOrder;
  code?: SortOrder;
  platform?: SortOrder;
  description?: SortOrder;
}
