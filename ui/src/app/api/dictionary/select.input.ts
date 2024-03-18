import { BaseSelectInput } from '@ui/core';
import { DictionaryWhereInput } from './where';
import { DictionaryOrderInput } from './order';

export class DictionarySelectInput extends BaseSelectInput(
  DictionaryWhereInput,
  DictionaryOrderInput
) {}
