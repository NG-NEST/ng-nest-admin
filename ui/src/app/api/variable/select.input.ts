import { BaseSelectInput } from '@ui/core';
import { VariableWhereInput } from './where';
import { VariableOrderInput } from './order';

export class VariableSelectInput extends BaseSelectInput(VariableWhereInput, VariableOrderInput) {}
