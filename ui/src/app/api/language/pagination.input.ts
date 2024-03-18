import { LanguageWhereInput } from './where';
import { LanguageOrderInput } from './order';
import { BasePaginationInput } from '@ui/core';

export class LanguagePaginationInput extends BasePaginationInput(
  LanguageWhereInput,
  LanguageOrderInput
) {}
