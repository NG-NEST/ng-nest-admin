export enum ResourceDescription {
  Resource = 'resource',

  Id = 'id',
  Pid = 'pid',
  Type = 'type',
  Icon = 'icon',
  Name = 'name',
  Code = 'code',
  Sort = 'sort',
  Description = 'description',

  Parent = 'parent',
  Children = 'children'
}

export enum ResourceMessage {
  CreatedSuccess = 'createdSuccess',
  UpdatedSuccess = 'updatedSuccess',
  DeletedSuccess = 'deletedSuccess'
}
