import { ObjectType } from '@nestjs/graphql';
import { BasePaginationOutput } from '@api/core';
import { Model } from './model.model';

@ObjectType()
export class ModelPaginationOutput extends BasePaginationOutput(Model) {}
