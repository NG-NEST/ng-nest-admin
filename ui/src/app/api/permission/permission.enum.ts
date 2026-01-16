export const PermissionI18n = 'permission';

export enum PermissionAuth {
  PermissionCreate = 'permission-create',
  PermissionUpdate = 'permission-update',
  PermissionDelete = 'permission-delete'
}

export enum PermissionDescription {
  Permission = 'permission',

  Id = 'id',
  Name = 'name',
  Code = 'code',
  Sort = 'sort',
  Description = 'description'
}

export enum PermissionIncludeDescription {
  PermissionResource = 'permissionResource'
}

export enum PermissionMessage {
  CreatedSuccess = 'createdSuccess',
  UpdatedSuccess = 'updatedSuccess',
  DeletedSuccess = 'deletedSuccess'
}
