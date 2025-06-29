import { SchemaDataWhereInput } from './where';
import { SchemaDataOrderInput } from './order';
import { BasePaginationInput } from '@ui/core';

export class SchemaDataPaginationInput extends BasePaginationInput(
  SchemaDataWhereInput,
  SchemaDataOrderInput
) {}
