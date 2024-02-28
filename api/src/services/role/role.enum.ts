import { ID } from '@nestjs/graphql';
export const RoleI18n = 'role';

export enum RoleAuth {
  RoleCreate = 'role-create',
  RoleUpdate = 'role-update',
  RoleDelete = 'role-delete',
  RolePermissions = 'role-permisions',
}

export enum RoleDescription {
  Role = '角色',

  Id = '角色编码',
  Name = '角色名称',
  Description = '角色描述',
}

export enum RoleIncludeDescription {
  RoleUser = '角色用户',
}

export enum RoleResolverName {
  Role = '角色详情',
  Roles = '角色列表',
  RoleSelect = '角色查询（没有分页）',
  CreateRole = '创建角色',
  UpdateRole = '更新角色',
  DeleteRole = '删除角色',
}

export const RoleId = { type: () => ID, description: RoleDescription.Id };
