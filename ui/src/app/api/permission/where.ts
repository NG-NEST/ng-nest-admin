import { BaseWhereInput, NumberFilter, StringFilter } from '@ui/core';

export class PermissionWhere {
  name?: StringFilter;
  code?: StringFilter;
  sort?: NumberFilter;
  description?: StringFilter;
}

export class PermissionWhereInput extends BaseWhereInput<PermissionWhere> {}
