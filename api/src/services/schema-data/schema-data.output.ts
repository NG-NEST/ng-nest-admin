import { ObjectType } from '@nestjs/graphql';
import { BasePaginationOutput } from '@api/core';
import { SchemaData } from './schema-data.model';

@ObjectType()
export class SchemaDataPaginationOutput extends BasePaginationOutput(SchemaData) {}
