import { BasePaginationInput } from '@api/core';
import { ArgsType } from '@nestjs/graphql';
import { VariableCategoryWhereInput } from './where';
import { VariableCategoryOrderInput } from './order';

@ArgsType()
export class VariableCategoryPaginationInput extends BasePaginationInput(
  VariableCategoryWhereInput,
  VariableCategoryOrderInput
) {}
