import { BaseWhereInput, NumberFilter, StringFilter } from '@ui/core';

export class ResourceWhereInput extends BaseWhereInput<ResourceWhereInput> {
  name?: string | StringFilter;
  code?: string | StringFilter;
  sort?: number | NumberFilter;
  description?: string | StringFilter;
  pid?: string | StringFilter;
  subjectId?: string | StringFilter;
}
