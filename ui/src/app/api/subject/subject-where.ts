import { BaseWhereInput, StringFilter } from '@ui/core';

export class SubjectWhereInput extends BaseWhereInput<SubjectWhereInput> {
  name?: string | StringFilter;
  code?: string | StringFilter;
  description?: string | StringFilter;
}
