import { SchemaWhereInput } from './where';
import { SchemaOrderInput } from './order';
import { BaseSelectInput } from '@ui/core';

export class SchemaSelectInput extends BaseSelectInput(SchemaWhereInput, SchemaOrderInput) {}
