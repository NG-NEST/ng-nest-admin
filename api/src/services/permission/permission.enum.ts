import { ID } from '@nestjs/graphql';
export const PermissionI18n = 'permission';

export enum PermissionAuth {
  PermissionCreate = 'permission-create',
  PermissionUpdate = 'permission-update',
  PermissionDelete = 'permission-delete',
}

export enum PermissionDescription {
  Permission = 'Permission',

  Id = 'PermissionId',
  Name = 'Name',
  Code = 'Code',
  Sort = 'Sort',
  Description = 'Description',
}

export enum PermissionIncludeDescription {
  PermissionResource = 'PermissionResource',
}

export enum PermissionResolverName {
  Permission = 'Permission',
  Permissions = 'Permissions',
  PermissionSelect = 'PermissionSelect. No Pagination',
  PermissionResources = 'PermissionResources. No Pagination',
  CreatePermission = 'CreatePermission',
  UpdatePermission = 'UpdatePermission',
  DeletePermission = 'DeletePermission',
}

export const PermissionId = { type: () => ID, description: PermissionDescription.Id };
export const PermissionCode = { description: PermissionDescription.Code };
