import { BasePaginationInput } from '@ui/core';
import { ResourceWhereInput } from './where';
import { ResourceOrderInput } from './order';

export class ResourcePaginationInput extends BasePaginationInput(
  ResourceWhereInput,
  ResourceOrderInput
) {}
