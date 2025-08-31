import { BasePaginationInput } from '@api/core';
import { ArgsType } from '@nestjs/graphql';
import { PromptWhereInput } from './where';
import { PromptOrderInput } from './order';

@ArgsType()
export class PromptPaginationInput extends BasePaginationInput(PromptWhereInput, PromptOrderInput) {}
