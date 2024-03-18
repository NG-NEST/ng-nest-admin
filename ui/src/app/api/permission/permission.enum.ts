export const PermissionI18n = 'permission';

export enum PermissionAuth {
  PermissionCreate = 'permission-create',
  PermissionUpdate = 'permission-update',
  PermissionDelete = 'permission-delete'
}

export enum PermissionDescription {
  Permission = 'Permission',

  Id = 'PermissionId',
  Name = 'Name',
  Code = 'Code',
  Sort = 'Sort',
  Description = 'Description'
}

export enum PermissionIncludeDescription {
  PermissionResource = 'PermissionResource'
}

export enum PermissionMessage {
  CreatedSuccess = '新增许可成功',
  UpdatedSuccess = '更新许可成功',
  DeletedSuccess = '删除许可成功'
}
