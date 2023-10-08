import { BasePaginationInput } from '@ui/core';
import { RoleWhereInput } from './role-where';
import { RoleOrderInput } from './role-order';

export class RolePaginationInput extends BasePaginationInput(RoleWhereInput, RoleOrderInput) {}
