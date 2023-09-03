import { BasePaginationInput } from '@api/core';
import { ArgsType } from '@nestjs/graphql';
import { UserWhereInput } from './user-where';
import { UserOrderInput } from './user-order';

@ArgsType()
export class UserPaginationInput extends BasePaginationInput(UserWhereInput, UserOrderInput) {}
