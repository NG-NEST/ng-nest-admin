import { BasePaginationInput } from '@api/core';
import { ArgsType } from '@nestjs/graphql';
import { ResourceWhereInput } from './resource-where';
import { ResourceOrderInput } from './resource-order';

@ArgsType()
export class ResourcePaginationInput extends BasePaginationInput(ResourceWhereInput, ResourceOrderInput) {}
