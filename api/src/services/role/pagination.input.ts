import { BasePaginationInput } from '@api/core';
import { ArgsType } from '@nestjs/graphql';
import { RoleWhereInput } from './where';
import { RoleOrderInput } from './order';

@ArgsType()
export class RolePaginationInput extends BasePaginationInput(RoleWhereInput, RoleOrderInput) {}
