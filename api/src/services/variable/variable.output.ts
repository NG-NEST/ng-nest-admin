import { ObjectType } from '@nestjs/graphql';
import { BasePaginationOutput } from '@api/core';
import { Variable } from './variable.model';

@ObjectType()
export class VariablePaginationOutput extends BasePaginationOutput(Variable) {}
