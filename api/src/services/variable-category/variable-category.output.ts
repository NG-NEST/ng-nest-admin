import { ObjectType } from '@nestjs/graphql';
import { BasePaginationOutput } from '@api/core';
import { VariableCategory } from './variable-category.model';

@ObjectType()
export class VariableCategoryPaginationOutput extends BasePaginationOutput(VariableCategory) {}
