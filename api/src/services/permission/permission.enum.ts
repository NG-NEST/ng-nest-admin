import { ID } from '@nestjs/graphql';
export const PERMISSION_I18N = 'permission';

export enum PermissionAuth {
  PermissionCreate = 'permission-create',
  PermissionUpdate = 'permission-update',
  PermissionDelete = 'permission-delete',

  PermissionSaveMany = 'permission-save-many',
}

export enum PermissionDescription {
  Permission = 'Permission',

  Id = 'PermissionId',
  Name = 'Name',
  Code = 'Code',
  Sort = 'Sort',
  Description = 'Description',
  ResourceId = 'ResourceId',

  Many = 'Many',
}

export enum PermissionIncludeDescription {
  PermissionResource = 'PermissionResource',
}

export enum PermissionResolverName {
  Permission = 'Permission',
  Permissions = 'Permissions',
  PermissionSelect = 'PermissionSelect. No Pagination',
  CreatePermission = 'CreatePermission',
  UpdatePermission = 'UpdatePermission',
  DeletePermission = 'DeletePermission',
}

export enum PermissionCache {
  Permission = 'Permission',
  Permissions = 'Permissions',
  PermissionSelect = 'PermissionSelect',
}

export const PermissionCacheClear = Object.keys(PermissionCache);

export const PermissionId = { type: () => ID, description: PermissionDescription.Id };
export const PermissionCode = { description: PermissionDescription.Code };
