import { BasePaginationInput } from '@api/core';
import { ArgsType } from '@nestjs/graphql';
import { PermissionWhereInput } from './permission-where';
import { PermissionOrderInput } from './permission-order';

@ArgsType()
export class PermissionPaginationInput extends BasePaginationInput(
  PermissionWhereInput,
  PermissionOrderInput
) {}
