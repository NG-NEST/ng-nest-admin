import { BasePaginationInput } from '@ui/core';
import { UserWhereInput } from './where';
import { UserOrderInput } from './order';

export class UserPaginationInput extends BasePaginationInput(UserWhereInput, UserOrderInput) {}
