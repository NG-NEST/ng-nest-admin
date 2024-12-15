import { BaseWhereInput, StringFilter } from '@ui/core';

export class PermissionWhereInput extends BaseWhereInput<PermissionWhereInput> {
  resourceId?: string | StringFilter;
}
