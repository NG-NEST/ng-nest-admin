import { BasePaginationInput } from '@api/core';
import { ArgsType } from '@nestjs/graphql';
import { SchemaWhereInput } from './where';
import { SchemaOrderInput } from './order';

@ArgsType()
export class SchemaPaginationInput extends BasePaginationInput(
  SchemaWhereInput,
  SchemaOrderInput,
) {}
