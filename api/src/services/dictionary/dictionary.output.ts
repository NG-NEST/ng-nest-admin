import { ObjectType } from '@nestjs/graphql';
import { BasePaginationOutput } from '@api/core';
import { Dictionary } from './dictionary.model';

@ObjectType()
export class DictionaryPaginationOutput extends BasePaginationOutput(Dictionary) {}
