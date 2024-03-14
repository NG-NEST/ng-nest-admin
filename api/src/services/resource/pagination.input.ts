import { BasePaginationInput } from '@api/core';
import { ArgsType } from '@nestjs/graphql';
import { ResourceWhereInput } from './where';
import { ResourceOrderInput } from './order';

@ArgsType()
export class ResourcePaginationInput extends BasePaginationInput(
  ResourceWhereInput,
  ResourceOrderInput
) {}
