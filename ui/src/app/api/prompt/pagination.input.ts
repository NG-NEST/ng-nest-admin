import { BasePaginationInput } from '@ui/core';
import { PromptWhereInput } from './where';
import { PromptOrderInput } from './order';

export class PromptPaginationInput extends BasePaginationInput(PromptWhereInput, PromptOrderInput) {}
