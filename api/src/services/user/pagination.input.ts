import { BasePaginationInput } from '@api/core';
import { ArgsType } from '@nestjs/graphql';
import { UserWhereInput } from './where';
import { UserOrderInput } from './order';

@ArgsType()
export class UserPaginationInput extends BasePaginationInput(UserWhereInput, UserOrderInput) {}
