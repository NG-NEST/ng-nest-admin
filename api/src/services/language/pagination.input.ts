import { BasePaginationInput } from '@api/core';
import { ArgsType } from '@nestjs/graphql';
import { LanguageWhereInput } from './where';
import { LanguageOrderInput } from './order';

@ArgsType()
export class LanguagePaginationInput extends BasePaginationInput(
  LanguageWhereInput,
  LanguageOrderInput
) {}
