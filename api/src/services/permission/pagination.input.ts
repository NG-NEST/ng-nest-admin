import { BasePaginationInput } from '@api/core';
import { ArgsType } from '@nestjs/graphql';
import { PermissionWhereInput } from './where';
import { PermissionOrderInput } from './order';

@ArgsType()
export class PermissionPaginationInput extends BasePaginationInput(
  PermissionWhereInput,
  PermissionOrderInput
) {}
