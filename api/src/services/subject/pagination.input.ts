import { BasePaginationInput } from '@api/core';
import { ArgsType } from '@nestjs/graphql';
import { SubjectWhereInput } from './where';
import { SubjectOrderInput } from './order';

@ArgsType()
export class SubjectPaginationInput extends BasePaginationInput(
  SubjectWhereInput,
  SubjectOrderInput
) {}
