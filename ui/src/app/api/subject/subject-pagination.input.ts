import { BasePaginationInput } from '@ui/core';
import { SubjectWhereInput } from './subject-where';
import { SubjectOrderInput } from './subject-order';

export class SubjectPaginationInput extends BasePaginationInput(SubjectWhereInput, SubjectOrderInput) {}
