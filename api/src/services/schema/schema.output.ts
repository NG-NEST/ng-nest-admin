import { ObjectType } from '@nestjs/graphql';
import { BasePaginationOutput } from '@api/core';
import { Schema } from './schema.model';

@ObjectType()
export class SchemaPaginationOutput extends BasePaginationOutput(Schema) {}
