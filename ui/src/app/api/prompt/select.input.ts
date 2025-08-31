import { BaseSelectInput } from '@ui/core';
import { PromptWhereInput } from './where';
import { PromptOrderInput } from './order';

export class PromptSelectInput extends BaseSelectInput(PromptWhereInput, PromptOrderInput) {}
