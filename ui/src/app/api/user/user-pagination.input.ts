import { BasePaginationInput } from '@ui/core';
import { UserWhereInput } from './user-where';
import { UserOrderInput } from './user-order';
import { UserIncludeInput } from './user-include';

export class UserPaginationInput extends BasePaginationInput(UserWhereInput, UserOrderInput, UserIncludeInput) {}
