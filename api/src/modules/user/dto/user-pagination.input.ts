import { BasePaginationInput } from '@api/core';
import { ArgsType } from '@nestjs/graphql';
import { UserWhereInput } from './user-where';
import { UserOrderInput } from './user-order';
import { UserIncludeInput } from './user-include';

@ArgsType()
export class UserPaginationInput extends BasePaginationInput(UserWhereInput, UserOrderInput, UserIncludeInput) {}
