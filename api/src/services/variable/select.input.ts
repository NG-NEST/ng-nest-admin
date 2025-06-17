import { ArgsType } from '@nestjs/graphql';
import { VariableWhereInput } from './where';
import { VariableOrderInput } from './order';
import { BaseSelectInput } from '@api/core';

@ArgsType()
export class VariableSelectInput extends BaseSelectInput(
  VariableWhereInput,
  VariableOrderInput,
) {}
