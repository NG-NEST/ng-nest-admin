import { BaseWhereInput, NumberFilter, StringFilter } from '@ui/core';

export class DictionaryWhere {
  name?: StringFilter;
  code?: StringFilter;
  sort?: NumberFilter;
  description?: StringFilter;
  pid?: StringFilter;
}

export class DictionaryWhereInput extends BaseWhereInput<DictionaryWhere> {}
