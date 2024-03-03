import { BasePaginationInput } from '@api/core';
import { ArgsType } from '@nestjs/graphql';
import { LanguageWhereInput } from './language-where';
import { LanguageOrderInput } from './language-order';

@ArgsType()
export class LanguagePaginationInput extends BasePaginationInput(
  LanguageWhereInput,
  LanguageOrderInput
) {}
