import { BasePaginationInput } from '@ui/core';
import { PermissionWhereInput } from './where';
import { PermissionOrderInput } from './order';

export class PermissionPaginationInput extends BasePaginationInput(
  PermissionWhereInput,
  PermissionOrderInput
) {}
