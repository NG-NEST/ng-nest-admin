import { BaseWhereInput, StringFilter } from '@ui/core';

export class SubjectWhereInput extends BaseWhereInput<SubjectWhereInput> {
  name?: string | StringFilter;
  description?: string | StringFilter;
}
