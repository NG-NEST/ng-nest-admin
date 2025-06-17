import { ArgsType } from '@nestjs/graphql';
import { VariableCategoryWhereInput } from './where';
import { VariableCategoryOrderInput } from './order';
import { BaseSelectInput } from '@api/core';

@ArgsType()
export class VariableCategorySelectInput extends BaseSelectInput(
  VariableCategoryWhereInput,
  VariableCategoryOrderInput,
) {}
