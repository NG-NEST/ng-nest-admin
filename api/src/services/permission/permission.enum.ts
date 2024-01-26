import { ID } from '@nestjs/graphql';

export enum PermissionDescription {
  Permission = '许可',

  Id = '许可编码',
  Name = '许可名称',
  Code = '许可标识',
  Sort = '许可排序',
  Description = '许可描述'
}

export enum PermissionIncludeDescription {
  PermissionResource = '许可资源'
}

export enum PermissionResolverName {
  Permission = '许可详情',
  Permissions = '许可列表',
  PermissionSelect = '许可查询（没有分页）',
  PermissionResources = '许可对应的资源（没有分页）',
  CreatePermission = '创建许可',
  UpdatePermission = '更新许可',
  DeletePermission = '删除许可'
}

export const PermissionId = { type: () => ID, description: PermissionDescription.Id };
export const PermissionCode = { description: PermissionDescription.Code };
