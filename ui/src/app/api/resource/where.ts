import { BaseWhereInput, NumberFilter, StringFilter } from '@ui/core';
import { SubjectWhereInput } from '../subject/where';

export class ResourceWhereInput extends BaseWhereInput<ResourceWhereInput> {
  name?: string | StringFilter;
  code?: string | StringFilter;
  sort?: number | NumberFilter;
  description?: string | StringFilter;
  pid?: string | StringFilter;
  subjectId?: string | StringFilter;
  subject?: SubjectWhereInput;
}
