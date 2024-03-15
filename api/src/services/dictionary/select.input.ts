import { ArgsType } from '@nestjs/graphql';
import { DictionaryWhereInput } from './where';
import { DictionaryOrderInput } from './order';
import { BaseSelectInput } from '@api/core';

@ArgsType()
export class DictionarySelectInput extends BaseSelectInput(
  DictionaryWhereInput,
  DictionaryOrderInput,
) {}
