import { ID } from '@nestjs/graphql';
export const ROLE_I18N = 'role';

export enum RoleAuth {
  RoleCreate = 'role-create',
  RoleUpdate = 'role-update',
  RoleDelete = 'role-delete',
  RolePermissionUpdate = 'role-permission-update',
}

export enum RoleDescription {
  Role = 'Role',

  Id = 'RoleId',
  Name = 'Name',
  Description = 'Description',
}

export enum RoleIncludeDescription {
  RoleUser = 'RoleUser',
}

export enum RoleResolverName {
  Role = 'Role',
  Roles = 'Roles',
  RoleSelect = 'RoleSelect. No Pagination',
  RolePermissions = 'RolePermissions. No Pagination',
  CreateRole = 'CreateRole',
  UpdateRole = 'UpdateRole',
  DeleteRole = 'DeleteRole',
}

export enum RoleCache {
  Role = 'Role',
  Roles = 'Roles',
  RoleSelect = 'RoleSelect',
  RolePermissions = 'RolePermissions',
}

export const RoleCacheClear = Object.keys(RoleCache);

export const RoleId = { type: () => ID, description: RoleDescription.Id };
