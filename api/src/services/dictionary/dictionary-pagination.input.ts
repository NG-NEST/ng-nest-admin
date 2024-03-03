import { BasePaginationInput } from '@api/core';
import { ArgsType } from '@nestjs/graphql';
import { DictionaryWhereInput } from './dictionary-where';
import { DictionaryOrderInput } from './dictionary-order';

@ArgsType()
export class DictionaryPaginationInput extends BasePaginationInput(
  DictionaryWhereInput,
  DictionaryOrderInput,
) {}
