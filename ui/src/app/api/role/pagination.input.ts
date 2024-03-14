import { BasePaginationInput } from '@ui/core';
import { RoleWhereInput } from './where';
import { RoleOrderInput } from './order';

export class RolePaginationInput extends BasePaginationInput(RoleWhereInput, RoleOrderInput) {}
