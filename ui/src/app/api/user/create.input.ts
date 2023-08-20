import { BaseCreateWithoutInput } from '@ui/core';

export class CreateUserInput {
  name!: string;
  account!: string;
  password!: string;
  email!: string;
  phone?: string;
  roles?: CreateUserRole;
}

export class CreateUserRole extends BaseCreateWithoutInput<CreateRole> {}

export class CreateRole {
  role: any;
}
