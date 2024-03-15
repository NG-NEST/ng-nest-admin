import { BaseWhereInput, StringFilter } from '@ui/core';

export class LanguageWhere {
  key?: StringFilter;
  value?: StringFilter;
  languageCode?: StringFilter;
}

export class LanguageWhereInput extends BaseWhereInput<LanguageWhere> {}
