import { BasePaginationInput } from '@ui/core';
import { SubjectWhereInput } from './where';
import { SubjectOrderInput } from './order';

export class SubjectPaginationInput extends BasePaginationInput(
  SubjectWhereInput,
  SubjectOrderInput
) {}
