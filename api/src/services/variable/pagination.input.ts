import { BasePaginationInput } from '@api/core';
import { ArgsType } from '@nestjs/graphql';
import { VariableWhereInput } from './where';
import { VariableOrderInput } from './order';

@ArgsType()
export class VariablePaginationInput extends BasePaginationInput(
  VariableWhereInput,
  VariableOrderInput
) {}
