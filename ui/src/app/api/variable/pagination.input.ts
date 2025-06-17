import { BasePaginationInput } from '@ui/core';
import { VariableWhereInput } from './where';
import { VariableOrderInput } from './order';

export class VariablePaginationInput extends BasePaginationInput(
  VariableWhereInput,
  VariableOrderInput
) {}
