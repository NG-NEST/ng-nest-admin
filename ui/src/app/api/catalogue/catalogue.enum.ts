export enum CatalogueDescription {
  Catalogue = '节点',

  Id = '节点编码',
  Pid = '父节点编码',
  Name = '节点名称',
  Type = '节点类型',
  Sort = '节点排序',
  Description = '节点描述',

  Parent = '父节点',
  Children = '子节点集合'
}

export enum CatalogueType {
  Folder = 'Folder',
  File = 'File'
}

export enum CatalogueMessage {
  CreatedSuccess = '新增节点成功',
  UpdatedSuccess = '更新节点成功',
  DeletedSuccess = '删除节点成功'
}
