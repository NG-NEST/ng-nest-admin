import { BasePaginationInput } from '@api/core';
import { ArgsType } from '@nestjs/graphql';
import { SchemaDataWhereInput } from './where';
import { SchemaDataOrderInput } from './order';

@ArgsType()
export class SchemaDataPaginationInput extends BasePaginationInput(
  SchemaDataWhereInput,
  SchemaDataOrderInput
) {}
