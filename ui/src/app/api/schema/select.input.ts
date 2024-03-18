import { ArgsType } from '@nestjs/graphql';
import { SchemaWhereInput } from './where';
import { SchemaOrderInput } from './order';
import { BaseSelectInput } from '@api/core';

@ArgsType()
export class SchemaSelectInput extends BaseSelectInput(SchemaWhereInput, SchemaOrderInput) {}
