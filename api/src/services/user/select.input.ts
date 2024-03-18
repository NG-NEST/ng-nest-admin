import { ArgsType } from '@nestjs/graphql';
import { UserWhereInput } from './where';
import { UserOrderInput } from './order';
import { BaseSelectInput } from '@api/core';

@ArgsType()
export class UserSelectInput extends BaseSelectInput(UserWhereInput, UserOrderInput) {}
