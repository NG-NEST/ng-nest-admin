import { ArgsType } from '@nestjs/graphql';
import { SchemaDataWhereInput } from './where';
import { SchemaDataOrderInput } from './order';
import { BaseSelectInput } from '@api/core';

@ArgsType()
export class SchemaDataSelectInput extends BaseSelectInput(
  SchemaDataWhereInput,
  SchemaDataOrderInput,
) {}
