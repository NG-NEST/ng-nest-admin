import { BaseSelectInput } from '@ui/core';
import { UserWhereInput } from './where';
import { UserOrderInput } from './order';

export class UserSelectInput extends BaseSelectInput(UserWhereInput, UserOrderInput) {}
