import { ArgsType } from '@nestjs/graphql';
import { PromptWhereInput } from './where';
import { PromptOrderInput } from './order';
import { BaseSelectInput } from '@api/core';

@ArgsType()
export class PromptSelectInput extends BaseSelectInput(PromptWhereInput, PromptOrderInput) {}
