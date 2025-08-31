import { BasePaginationInput } from '@ui/core';
import { ModelWhereInput } from './where';
import { ModelOrderInput } from './order';

export class ModelPaginationInput extends BasePaginationInput(ModelWhereInput, ModelOrderInput) {}
