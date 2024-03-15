import { BaseOrder, SortOrder } from '@ui/core';

export class LanguageOrderInput extends BaseOrder {
  key?: SortOrder;
  value?: SortOrder;
  languageCode?: SortOrder;
}
