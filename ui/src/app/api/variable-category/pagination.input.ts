import { BasePaginationInput } from '@ui/core';
import { VariableCategoryWhereInput } from './where';
import { VariableCategoryOrderInput } from './order';

export class VariableCategoryPaginationInput extends BasePaginationInput(
  VariableCategoryWhereInput,
  VariableCategoryOrderInput
) {}
