import { BasePaginationInput } from '@api/core';
import { ArgsType } from '@nestjs/graphql';
import { SubjectWhereInput } from './subject-where';
import { SubjectOrderInput } from './subject-order';

@ArgsType()
export class SubjectPaginationInput extends BasePaginationInput(
  SubjectWhereInput,
  SubjectOrderInput
) {}
