import { BasePaginationInput } from '@api/core';
import { ArgsType } from '@nestjs/graphql';
import { DictionaryWhereInput } from './where';
import { DictionaryOrderInput } from './order';

@ArgsType()
export class DictionaryPaginationInput extends BasePaginationInput(
  DictionaryWhereInput,
  DictionaryOrderInput,
) {}
