import { ID } from '@nestjs/graphql';

export enum UserAuth {
  UserCreate = 'user-create',
  UserUpdate = 'user-update',
  UserDelete = 'user-delete',
  UserResetPassword = 'user-reset-password',
}

export enum UserDescription {
  User = '用户',

  Id = '用户编码',
  Name = '用户名称',
  Account = '用户账号',
  Password = '用户密码',
  Email = '用户邮箱',
  Phone = '用户手机号',
}

export enum UserIncludeDescription {
  UserRole = '用户角色',
}

export enum UserResolverName {
  User = '用户详情',
  Users = '用户列表',
  UserSelect = '用户查询（没有分页）',
  CreateUser = '创建用户',
  UpdateUser = '更新用户',
  DeleteUser = '删除用户',
}

export const UserId = { type: () => ID, description: UserDescription.Id };