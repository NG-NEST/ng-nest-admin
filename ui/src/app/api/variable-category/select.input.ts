import { BaseSelectInput } from '@ui/core';
import { VariableCategoryWhereInput } from './where';
import { VariableCategoryOrderInput } from './order';

export class VariableCategorySelectInput extends BaseSelectInput(
  VariableCategoryWhereInput,
  VariableCategoryOrderInput
) {}
