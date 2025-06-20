import { ID } from '@nestjs/graphql';
export const RESOURCE_I18N = 'resource';

export enum ResourceAuth {
  ResourceCreate = 'resource-create',
  ResourceUpdate = 'resource-update',
  ResourceDelete = 'resource-delete',
}

export enum ResourceDescription {
  Resource = 'Resource',

  Id = 'ResourceId',
  Pid = 'Pid',
  Type = 'Type',
  Name = 'Name',
  Code = 'Code',
  Sort = 'Sort',
  Description = 'Description',

  Parent = 'Parent',
  Children = 'Children',
}

export enum ResourceResolverName {
  Resource = 'Resource',
  Resources = 'Resources',
  ResourceSelect = 'ResourceSelect. No Pagination',
  CreateResource = 'CreateResource',
  UpdateResource = 'UpdateResource',
  DeleteResource = 'DeleteResource',
}

export enum ResourceCache {
  Resource = 'Resource',
  Resources = 'Resources',
  ResourceSelect = 'ResourceSelect',
}

export const ResourceCacheClear = Object.keys(ResourceCache);

export const ResourceId = { type: () => ID, description: ResourceDescription.Id };
