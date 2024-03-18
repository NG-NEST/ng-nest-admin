import { ArgsType } from '@nestjs/graphql';
import { PermissionWhereInput } from './where';
import { PermissionOrderInput } from './order';
import { BaseSelectInput } from '@api/core';

@ArgsType()
export class PermissionSelectInput extends BaseSelectInput(
  PermissionWhereInput,
  PermissionOrderInput,
) {}
