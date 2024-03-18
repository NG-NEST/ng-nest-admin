import { PermissionWhereInput } from './where';
import { PermissionOrderInput } from './order';
import { BaseSelectInput } from '@ui/core';

export class PermissionSelectInput extends BaseSelectInput(
  PermissionWhereInput,
  PermissionOrderInput
) {}
