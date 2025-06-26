export enum ResourceDescription {
  Resource = '资源',

  Id = '资源编码',
  Pid = '父节点编码',
  Type = '资源类型',
  Icon = '资源图标',
  Name = '资源名称',
  Code = '资源标识',
  Sort = '资源排序',
  Description = '资源描述',

  Parent = '父资源',
  Children = '子资源集合'
}

export enum ResourceMessage {
  CreatedSuccess = '新增资源成功',
  UpdatedSuccess = '更新资源成功',
  DeletedSuccess = '删除资源成功'
}
