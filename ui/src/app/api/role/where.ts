import { BaseWhereInput, StringFilter } from '@ui/core';

export class RoleWhereInput extends BaseWhereInput<RoleWhereInput> {
  name?: string | StringFilter;
  description?: string | StringFilter;
}
