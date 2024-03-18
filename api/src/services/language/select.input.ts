import { ArgsType } from '@nestjs/graphql';
import { LanguageWhereInput } from './where';
import { LanguageOrderInput } from './order';
import { BaseSelectInput } from '@api/core';

@ArgsType()
export class LanguageSelectInput extends BaseSelectInput(LanguageWhereInput, LanguageOrderInput) {}
