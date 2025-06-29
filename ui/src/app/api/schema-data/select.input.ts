import { SchemaDataWhereInput } from './where';
import { SchemaDataOrderInput } from './order';
import { BaseSelectInput } from '@ui/core';

export class SchemaDataSelectInput extends BaseSelectInput(SchemaDataWhereInput, SchemaDataOrderInput) {}
