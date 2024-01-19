import { BasePaginationInput } from '@ui/core';
import { ResourceWhereInput } from './resource-where';
import { ResourceOrderInput } from './resource-order';

export class ResourcePaginationInput extends BasePaginationInput(
  ResourceWhereInput,
  ResourceOrderInput
) {}
