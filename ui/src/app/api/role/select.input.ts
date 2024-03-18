import { BaseSelectInput } from '@ui/core';
import { RoleWhereInput } from './where';
import { RoleOrderInput } from './order';

export class RoleSelectInput extends BaseSelectInput(RoleWhereInput, RoleOrderInput) {}
