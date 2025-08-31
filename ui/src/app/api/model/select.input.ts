import { BaseSelectInput } from '@ui/core';
import { ModelWhereInput } from './where';
import { ModelOrderInput } from './order';

export class ModelSelectInput extends BaseSelectInput(ModelWhereInput, ModelOrderInput) {}
