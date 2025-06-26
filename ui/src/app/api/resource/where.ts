import { BaseWhereInput, NumberFilter, StringFilter } from '@ui/core';
import { SubjectWhereInput } from '../subject/where';
import { ResourceCode } from './resource.model';

export class ResourceWhereInput extends BaseWhereInput<ResourceWhereInput> {
  name?: string | StringFilter;
  type?: string | StringFilter;
  icon?: string | StringFilter;
  code?: ResourceCode | StringFilter | NumberFilter;
  sort?: number | NumberFilter;
  description?: string | StringFilter;
  pid?: string | StringFilter;
  subjectId?: string | StringFilter;
  subject?: SubjectWhereInput;
}
