import { BasePaginationInput } from '@api/core';
import { ArgsType } from '@nestjs/graphql';
import { RoleWhereInput } from './role-where';
import { RoleOrderInput } from './role-order';

@ArgsType()
export class RolePaginationInput extends BasePaginationInput(RoleWhereInput, RoleOrderInput) {}
