import { ID } from '@nestjs/graphql';

export enum ResourceDescription {
  Resource = '资源',

  Id = '资源编码',
  Pid = '父节点编码',
  Name = '资源名称',
  Code = '资源标识',
  Sort = '资源排序',
  Description = '资源描述',

  Parent = '父资源',
  Children = '子资源集合'
}

export enum ResourceResolverName {
  Resource = '资源详情',
  Resources = '资源列表',
  ResourceSelect = '资源查询（没有分页）',
  CreateResource = '创建资源',
  UpdateResource = '更新资源',
  DeleteResource = '删除资源'
}

export const ResourceId = { type: () => ID, description: ResourceDescription.Id };
