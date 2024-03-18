import { ArgsType } from '@nestjs/graphql';
import { RoleWhereInput } from './where';
import { RoleOrderInput } from './order';
import { BaseSelectInput } from '@api/core';

@ArgsType()
export class RoleSelectInput extends BaseSelectInput(RoleWhereInput, RoleOrderInput) {}
