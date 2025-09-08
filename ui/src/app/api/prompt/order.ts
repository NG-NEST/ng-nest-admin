import { BaseOrder, SortOrder } from '@ui/core';

export class PromptOrderInput extends BaseOrder {
  name?: SortOrder;
  user?: SortOrder;
  system?: SortOrder;
  modelType?: SortOrder;
  modelId?: SortOrder;
  description?: SortOrder;
}
