import { ID } from '@nestjs/graphql';
export const UserI18n = 'user';

export enum UserAuth {
  UserCreate = 'user-create',
  UserUpdate = 'user-update',
  UserDelete = 'user-delete',
  UserResetPassword = 'user-reset-password',
}

export enum UserDescription {
  User = 'User',

  Id = 'UserId',
  Name = 'Name',
  Account = 'Account',
  Password = 'Password',
  Email = 'Email',
  Phone = 'Phone',
}

export enum UserIncludeDescription {
  UserRole = 'UserRole',
}

export enum UserResolverName {
  User = 'User',
  Users = 'Users',
  UserSelect = 'UserSelect. No Pagination',
  CreateUser = 'CreateUser',
  UpdateUser = 'UpdateUser',
  DeleteUser = 'DeleteUser',
}

export enum UserCache {
  User = 'User',
  Users = 'Users',
  UserSelect = 'UserSelect',
}

export const UserCacheClear = Object.keys(UserCache);

export const UserId = { type: () => ID, description: UserDescription.Id };
