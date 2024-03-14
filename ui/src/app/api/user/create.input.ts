import { BaseCreateWithoutInput } from '@ui/core';

export class UserCreateInput {
  name!: string;
  account!: string;
  password!: string;
  email!: string;
  phone?: string;
  roles?: CreateUserRole;
}

export class CreateUserRole extends BaseCreateWithoutInput<CreateRole> {}

export class CreateRole {
  roleId!: string;
}
