import { DictionaryWhereInput } from './where';
import { DictionaryOrderInput } from './order';
import { BasePaginationInput } from '@ui/core';

export class DictionaryPaginationInput extends BasePaginationInput(
  DictionaryWhereInput,
  DictionaryOrderInput
) {}
