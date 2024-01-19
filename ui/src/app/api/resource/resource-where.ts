import { BaseWhereInput, StringFilter } from '@ui/core';

export class ResourceWhereInput extends BaseWhereInput<ResourceWhereInput> {
  name?: string | StringFilter;
  code?: string | StringFilter;
  pid?: string | StringFilter;
  subjectId?: string | StringFilter;
}
