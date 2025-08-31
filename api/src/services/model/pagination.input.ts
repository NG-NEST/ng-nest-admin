import { BasePaginationInput } from '@api/core';
import { ArgsType } from '@nestjs/graphql';
import { ModelWhereInput } from './where';
import { ModelOrderInput } from './order';

@ArgsType()
export class ModelPaginationInput extends BasePaginationInput(ModelWhereInput, ModelOrderInput) {}
