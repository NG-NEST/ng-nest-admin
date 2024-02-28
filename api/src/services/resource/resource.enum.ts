import { ID } from '@nestjs/graphql';
export const ResourceI18n = 'resource';

export enum ResourceAuth {
  ResourceCreate = 'resource-create',
  ResourceUpdate = 'resource-update',
  ResourceDelete = 'resource-delete',
}

export enum ResourceDescription {
  Resource = 'Resource',

  Id = 'ResourceId',
  Pid = 'Pid',
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

export const ResourceId = { type: () => ID, description: ResourceDescription.Id };
