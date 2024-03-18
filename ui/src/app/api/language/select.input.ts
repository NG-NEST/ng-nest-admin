import { BaseSelectInput } from '@ui/core';
import { LanguageWhereInput } from './where';
import { LanguageOrderInput } from './order';

export class LanguageSelectInput extends BaseSelectInput(LanguageWhereInput, LanguageOrderInput) {}
