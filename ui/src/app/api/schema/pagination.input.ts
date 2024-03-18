import { SchemaWhereInput } from './where';
import { SchemaOrderInput } from './order';
import { BasePaginationInput } from '@ui/core';

export class SchemaPaginationInput extends BasePaginationInput(
  SchemaWhereInput,
  SchemaOrderInput
) {}
