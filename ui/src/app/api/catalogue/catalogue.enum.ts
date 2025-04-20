export enum CatalogueDescription {
  Catalogue = '目录',

  Id = '目录编码',
  Pid = '父节点编码',
  Name = '目录名称',
  Type = '目录类型',
  Sort = '目录排序',
  Description = '目录描述',

  Parent = '父目录',
  Children = '子目录集合'
}

export enum CatalogueType {
  Folder = 'Folder',
  File = 'File'
}

export enum CatalogueMessage {
  CreatedSuccess = '新增目录成功',
  UpdatedSuccess = '更新目录成功',
  DeletedSuccess = '删除目录成功'
}
